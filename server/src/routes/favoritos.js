const Favoritos = require('../models/favoritos');

async function routes(fastify, options) {
    fastify.get('/favoritos/user', { onRequest: [fastify.authenticate] }, async(req, res) => {
        try{
            const id = req.user.sub
            const favoritos = await Favoritos.findAll({where: {usuario_idusuario: id}})
            res.code(200).send(favoritos)
        }catch(err){
            res.code(400).send({message: "Não foi possivel buscar os favoritos do usuário"})
        }
    })
    
    fastify.post('/favorito', { onRequest: [fastify.authenticate] }, async(req, res) => {
        try{
            const idusuario = req.user.sub
            const { idreclamacao } = req.body
            if( (await Favoritos.findOne({where: {usuario_idusuario: idusuario, reclamacao_idreclamacao: idreclamacao}})) ){
                res.code(400).send({message: "Favorito já efetuado"})
                return null
            }
            const Favorito = await Favoritos.create({usuario_idusuario: idusuario, reclamacao_idreclamacao: idreclamacao})
            res.code(200).send({message: "Favorito dado"})
            }catch(err){
            res.code(400).send({message: "Erro ao dar favorito"})
        }
    })

    fastify.delete('/favorito', { onRequest: [fastify.authenticate] }, async(req, res) => {
        try{
            const idusuario = req.user.sub
            const { idreclamacao } = req.body

            const favorito = await Favoritos.findOne({where: {usuario_idusuario: idusuario, reclamacao_idreclamacao: idreclamacao}})

            if(!favorito){
                res.code(400).send({message: "Favorito não existe"})
                return null
            }
            
            await favorito.destroy()
            
            res.code(200).send({message: "Favorito deletado"})
            }catch(err){
            res.code(400).send({message: "Erro ao deletar favorito"})
        }
    })
}

module.exports = routes