const Categorias = require('../models/categorias');
const Endereco = require('../models/endereco');
const Reclamacao = require('../models/reclamacao');
const AtualizacoesReclamacoes = require('../models/atualizacoesReclamacoes');
const Likes = require('../models/likes');
const Cidade = require('../models/cidade');
const Departamento = require('../models/departamento');
const Anexos = require('../models/anexos');
const ReclamacaoAnexos = require('../models/reclamacaoAnexos');

const sequelize = require("../configBD");

async function routes(fastify, options) {
    fastify.get("/reclamacoes", { onRequest: [fastify.authenticatePass] }, async (req, res) => {
      try{
          const reclamacoes = await Reclamacao.findAll({include: [{model: Categorias}, {model: Departamento, include: [{model: Anexos}]}, { model: Endereco, include: [{model: Cidade}]  }, {model: Likes}, {model: ReclamacaoAnexos, include: [{model: Anexos}]} ]})

          const idUsuario = req.user ? req.user.sub : null
          
          const reclamacoesResponse = reclamacoes.map(reclamacao => {
            return {
              idreclamacao: reclamacao.idreclamacao,
              data_reclamacao: reclamacao.data_reclamacao,
              status:  reclamacao.status,
              categoria: reclamacao.categoria.descricao,

              cep: reclamacao.endereco.cep,
              estado: reclamacao.endereco.cidade.estado,
              cidade: reclamacao.endereco.cidade.cidade, 
              bairro: reclamacao.endereco.bairro,
              endereco: reclamacao.endereco.endereco,
              numero: reclamacao.endereco.numero,

              departamento: {
                iddepartamento: reclamacao.departamento.iddepartamento,
                departamento: reclamacao.departamento.departamento,
                logo: reclamacao.departamento.anexo ? reclamacao.departamento.anexo.url : null
              },

              imagem_capa: reclamacao.reclamacao_has_anexos.length > 0 ? reclamacao.reclamacao_has_anexos[0].anexo.url : null,

              numLikes: reclamacao.likes.length,
 
              userIsLike: reclamacao.likes.some( like => like.usuario_idusuario == idUsuario),

            }
          })
        
          res.code(200).send(reclamacoesResponse)
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

    fastify.post('/reclamacao', { onRequest: [fastify.authenticate] }, async (req, res) => {
        try{
            const {descricao, categorias_idcategorias, departamento_iddepartamento, cep, estado, cidade, bairro, endereco, numero, complemento, pontoReferencia } = req.body

            //Cidade
            var cidade_create = await Cidade.findOne({where: {estado, cidade}})
            if(!cidade_create){
                cidade_create = await Cidade.create({estado, cidade})
            }

            const cidade_idcidade = cidade_create.idcidade

            //Endereço
            const enderecoCreate = await Endereco.create({cep, cidade_idcidade, bairro, endereco, numero, complemento, pontoReferencia})
            const endereco_idendereco = enderecoCreate.idendereco

            const reclamacao = await Reclamacao.create({descricao, categorias_idcategorias, endereco_idendereco, departamento_iddepartamento})

            res.code(200).send({idreclamacao: reclamacao.idreclamacao, message: "Reclamação criada com sucesso"})

        }catch(err){
            res.code(400).send({message: "Erro ao cadastrar reclamação"})
        }
    })
}

module.exports = routes