const Comentarios = require('../models/comentario')

async function routes(fastify){
    fastify.get('/comentarios/reclamacao/:id', async(req, res) => {
        try{
            const {id} = req.params
            const comentarios = await Comentarios.findAll({where: {reclamacao_idreclamacao: id}})
            res.code(200).send(comentarios)
        }catch(err){
            res.code(400).send({message: "Erro ao buscar os comentários da reclamação"})
        }
    })

    fastify.get('/comentarios/user', { onRequest: [fastify.authenticate] }, async(req, res) => {
        try{
            const idusuario = req.user.sub
            const comentarios = await Comentarios.findAll({where: {usuario_idusuario: idusuario}})
            res.code(200).send(comentarios)
        }catch(err){
            res.code(400).send({message: "Erro ao buscar os comentários do usuário"})
        }
    })

    fastify.post('/comentario', { onRequest: [fastify.authenticate] }, async(req, res) => {
        try{
            const idusuario = req.user.sub
            const {comentario, idreclamacao} = req.body

            const comentarioCreate = await Comentarios.create({comentario, reclamacao_idreclamacao: idreclamacao, usuario_idusuario: idusuario})

            res.code(200).send({message: "Comentário criado"})
        }catch(err){
            res.code(400).send({message: "Erro ao criar o comentário"})
        }
    })

    fastify.put('/comentario', { onRequest: [fastify.authenticate] }, async(req, res) => {
        try{
            const idusuario = req.user.sub
            const {comentario, idcomentario} = req.body

            const comentarioFind = await Comentarios.findByPk(idcomentario)

            if(!comentarioFind){
                res.code(400).send({message: "Comentário não encontrado"})
                return null
            }

            if(comentarioFind.usuario_idusuario != idusuario){
                res.code(401).send({messgae: "Não é o proprietário do comentário"})
                return null
            }

            const comentarioCreate = await Comentarios.update({comentario}, {where: {idcomentario}})

            res.code(200).send({message: "Comentário atualizado"})
        }catch(err){
            res.code(400).send({message: "Erro ao atualizar o comentário"})
        }
    })

    fastify.delete('/comentario', { onRequest: [fastify.authenticate] }, async(req, res) => {
        try{
            const idusuario = req.user.sub
            const {idcomentario} = req.body

            const comentario = await Comentarios.findByPk(idcomentario)
            if(!comentario){
                res.code(400).send({message: "Comentário não existe"})
                return null
            }
            if(comentario.usuario_idusuario != idusuario){
                res.code(401).send({message: "Comentário pertence a outro usuário"})
                return null
            }
            await comentario.destroy()
            res.code(200).send({message: "Comentário deletado"})
        }catch(err){
            res.code(400).send({message: "Erro ao deletar o comentário"})
        }
    })

}

module.exports = routes