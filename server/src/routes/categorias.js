const { where } = require("sequelize")
const Categorias = require("../models/categorias")

async function routes(fastify){
    fastify.get('/categorias', async(req, res) => {
        try{
            const categorias = await Categorias.findAll()
            res.code(200).send(categorias)
        }catch(err){
            res.code(400).send({message: "Erro ao buscar categoria"})
        }
    })

    fastify.get('/categoria/:id', async(req, res) => {
        try{
            const {id} = req.params
            const categoria = await Categorias.findByPk(id)
            if(!categoria){
                res.code(400).send({message: "ID de Categoria inexistente"})
                return
            }
            res.code(200).send({categoria})
        }catch(err){
            res.code(400).send({message: "Erro ao buscar categoria"})
        }
    })

    fastify.post('/categoria', async(req, res) => {
        try{    
            const {descricao} = req.body
            if( (await Categorias.findOne({where: {descricao} })) ){
                res.code(400).send({message: "Categoria já existe"})
                return
            } 
            const {idcategorias} = await Categorias.create({descricao})
            res.code(200).send({message: "Categoria criada com sucesso", idcategorias})
        }catch(err){
            res.code(400).send({message: "Erro ao criar categoria"})
        }
    })

    fastify.delete('/categoria', async(req, res) => {
        try{    
            const {idcategorias} = req.body
            const categoria = await Categorias.findByPk(idcategorias)
            if(!categoria){
                res.code(400).send({message: "Categoria inexistente"})
                return
            } 
            await categoria.destroy()
            res.code(200).send({message: "Categoria deletada com sucesso"})
        }catch(err){
            res.code(400).send({message: "Erro ao deletar categoria"})
        }
    })

    fastify.put('/categoria', async(req, res) => {
        try{
            const {idcategorias, descricao} = req.body
            const categoria = await Categorias.findByPk(idcategorias)
            if(!categoria){
                res.code(400).send({message: "ID Categoria inexistente"})
                return
            }
            await Categorias.update({descricao}, {where: {idcategorias}} )
            res.code(200).send({message: "Categoria atualizada com sucesso"})
        }catch(err){
            res.code(400).send({message: "Erro ao buscar categoria"})
        }
    })


}

module.exports = routes