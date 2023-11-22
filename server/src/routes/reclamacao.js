const Categorias = require('../models/categorias');
const Endereco = require('../models/endereco');
const Reclamacao = require('../models/reclamacao');
const AtualizacoesReclamacoes = require('../models/atualizacoesReclamacoes');
const Likes = require('../models/likes');

async function routes(fastify, options) {
    fastify.get("/reclamacoes", async (req, res) => {
      try{
          const reclamacoes = await Reclamacao.findAll()
          res.code(200).send(reclamacoes)
      }catch(err){
          res.code(400).send({message: "Erro ao buscar reclamações"})
      }
    })
    fastify.get("/reclamacoes/:id", async (req, res) => {
        //try{
            const reclamacoes = await Reclamacao.findByPk(req.params.id, {include: [Categorias, Endereco, AtualizacoesReclamacoes, Likes]})
            res.code(200).send(reclamacoes)
        //}catch(err){
        //    res.code(400).send({message: "Erro ao buscar reclamações"})
        //}
      })
}

module.exports = routes