const Categorias = require('../models/categorias');
const Likes = require('../models/likes');
const Reclamacao = require('../models/reclamacao');
const Departamento = require('../models/departamento');
const Endereco = require('../models/endereco');
const Cidade = require('../models/cidade');
const Anexos = require('../models/anexos');
const User = require('../models/user');

async function routes(fastify, options) {
    fastify.get('/likes/user', { onRequest: [fastify.authenticate] }, async(req, res) => {
        try{
            const id = req.user.sub
            const likesGet = await Likes.findAll({
                include: [
                    {
                        model: Reclamacao,
                        attributes: ['idreclamacao', 'descricao', 'data_reclamacao', 'status'],
                        include: [{model: Categorias}, {model: Departamento, include: [{model: Anexos}], attributes: ['iddepartamento', 'departamento', 'descricao']}, {model: Endereco, include: [{model: Cidade}]}]
                    }
                ], 
                where: {usuario_idusuario: id}})
            const likes = likesGet.map(item => item.reclamacao);
            res.code(200).send(likes)
        }catch(err){
            res.code(400).send({message: "Não foi possivel buscar os likes do usuário"})
        }
    })

    fastify.get('/likes/reclamacao/:id', async(req, res) => {
        try{
            const {id} = req.params
            const likesGet = await Likes.findAll({include: [{model: User, attributes: ['idusuario', 'nome_completo'], include: [{model: Anexos}]}], where: {reclamacao_idreclamacao: id}})
            const likesMap = likesGet.map(item => item.usuario);
            const likes = likesMap.map(like => {
                return{
                    idusuario: like.idusuario,
                    nome_completo: like.nome_completo,
                    imagem_perfil: like.anexo ? like.anexo.url : null
                }
            })
            
            res.code(200).send(likes)
        }catch(err){
            res.code(400).send({message: "Não foi possivel buscar os likes da reclamação"})
        }
    })

    fastify.post('/like', { onRequest: [fastify.authenticate] }, async(req, res) => {
        try{
            const idusuario = req.user.sub
            const { idreclamacao } = req.body
            if( (await Likes.findOne({where: {usuario_idusuario: idusuario, reclamacao_idreclamacao: idreclamacao}})) ){
                res.code(400).send({message: "Like já efetuado"})
                return null
            }
            const like = await Likes.create({usuario_idusuario: idusuario, reclamacao_idreclamacao: idreclamacao})
            res.code(200).send({message: "Like dado"})
            }catch(err){
            res.code(400).send({message: "Erro ao dar like"})
        }
    })

    fastify.delete('/like', { onRequest: [fastify.authenticate] }, async(req, res) => {
        try{
            const idusuario = req.user.sub
            const { idreclamacao } = req.body

            const like = await Likes.findOne({where: {usuario_idusuario: idusuario, reclamacao_idreclamacao: idreclamacao}})

            if(!like){
                res.code(400).send({message: "Like não existe"})
                return null
            }
            
            await like.destroy()
            
            res.code(200).send({message: "Like deletado"})
            }catch(err){
            res.code(400).send({message: "Erro ao deletar like"})
        }
    })
}

module.exports = routes