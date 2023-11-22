const AtualizacoesReclamacoes = require('../models/atualizacoesReclamacoes')
const Reclamacao = require('../models/reclamacao')

async function routes(fastify){
    fastify.get('/atualizacoesreclamacoes/reclamacao/:id', async(req, res) => {
        try{
            const {id} = req.params
            const atualizacoes = await AtualizacoesReclamacoes.findAll({where: {reclamacao_idreclamacao: id}})
            res.code(200).send(atualizacoes)
        }catch(err){
            res.code(400).send({message: "Erro ao buscar as atualizações"})
        }
    })

    fastify.post('/atualizacoesreclamacoes', { onRequest: [fastify.authenticate] }, async(req, res) => {
        //try{
            const {iddepartamento} = req.user
            const {descricao, prazo, idreclamacao} = req.body

            const reclamacao = await Reclamacao.findByPk(idreclamacao)

            //Verificar se a reclamação pertence a esse departamento
            if(reclamacao.departamento_iddepartamento != iddepartamento){
                res.code(401).send({message: "Departamento não é responsável por essa reclamação"})
                return null
            }

            const atualizacao = await AtualizacoesReclamacoes.create({descricao, prazo, reclamacao_idreclamacao: idreclamacao})
            res.code(200).send({message: "Atualização da reclamação criada com sucesso"})
        //}catch(err){
        //    res.code(400).send({message: "Erro ao cadastrar atualização"})
        //}
    })
}

module.exports = routes