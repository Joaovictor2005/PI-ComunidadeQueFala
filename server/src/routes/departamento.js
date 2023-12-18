const Anexos = require("../models/anexos");
const Departamentos = require("../models/departamento");
const bcrypt = require('bcrypt');
const Endereco = require("../models/endereco");
const Cidade = require("../models/cidade");
const saltRounds = 10; // Número de rounds de geração de salt

async function routes(fastify, options) {
  fastify.get("/departamentos", async (req, res) => {
    try{
        const get = await Departamentos.findAll({attributes: ['iddepartamento', 'departamento', 'descricao'], include: Anexos})
        const departamentos = get.map( departamento => {
          return{
            iddepartamento: departamento.iddepartamento,
            departamento: departamento.departamento,
            descricao: departamento.descricao,
            logo: departamento.anexo ? departamento.anexo.url : null
          }
        }) 

        res.code(200).send(departamentos)
    }catch(err){
        res.code(400).send({message: "Erro ao buscar departamentos"})
    }
  })

  fastify.get("/departamento/:id", async(req, res) => {
    try{
        const {id} = req.params
        const item = await Departamentos.findByPk(id, {attributes: ['departamento', 'descricao'], include: [{model: Endereco, include: [{model: Cidade}]}, {model: Anexos}]})
        
        if(!item){
          res.code(400).send({message: "ID de departamento inexistente"})
          return
        }

        const departamento = {
            departamento: item.departamento,
            descricao: item.descricao,
            cep: item.endereco.cep,
            estado: item.endereco.cidade.estado,
            idcidade: item.endereco.cidade.idcidade,
            cidade: item.endereco.cidade.cidade,
            bairro: item.endereco.bairro,
            endereco: item.endereco.endereco,
            numero: item.endereco.numero,
            complemento: item.endereco.complemento,
            pontoReferencia: item.endereco.pontoReferencia,
            logo: item.anexo ? item.anexo.url : null
          }
        
        res.code(200).send(departamento)
    }catch(err){
        res.code(400).send({message: "Erro ao buscar o departamento"})
    }
  })

  fastify.get("/departamento/profile", { onRequest: [fastify.authenticate] }, async (req, res) => {
    try{
        const id = req.user.iddepartamento
        
        const item = await Departamentos.findByPk(id, {attributes: ['departamento', 'descricao', 'email'], include: [{model: Endereco, include: [{model: Cidade}]}, {model: Anexos}]})
        
        const departamento = {
            departamento: item.departamento,
            descricao: item.descricao,
            email: item.email,
            cep: item.endereco.cep,
            estado: item.endereco.cidade.estado,
            idcidade: item.endereco.cidade.idcidade,
            cidade: item.endereco.cidade.cidade,
            bairro: item.endereco.bairro,
            endereco: item.endereco.endereco,
            numero: item.endereco.numero,
            complemento: item.endereco.complemento,
            pontoReferencia: item.endereco.pontoReferencia,
            logo: item.anexo ? item.anexo.url : null
          }
        
        res.code(200).send(departamento)
    }catch(err){
        res.code(400).send({message: "Erro ao buscar departamento"})
    }
  })

  fastify.post("/departamento", async (req, res) => {
    try{
        var {departamento, email, senha, descricao, endereco_idendereco, logo} = req.body
        if(await Departamentos.findOne({where: {email}})){
            res.code(400).send({message: "Email já cadastrado"})
            return null
        }
        
        senha = await bcrypt.hash(senha, saltRounds)

        departamento = await Departamentos.create({departamento, email, senha, descricao, endereco_idendereco, logo})
        const {iddepartamento} = departamento
        res.code(200).send({message: "Departamento criado com sucesso", iddepartamento})
    }catch(err){
    res.code(400).send({message: "Não foi possivel cadastrar o departamento"})
    }
  })

  fastify.put("/departamento", { onRequest: [fastify.authenticate] },async (req, res) => {
    try{
        const {iddepartamento} = req.user 
        var {departamento, email, descricao, endereco_idendereco, logo} = req.body

        const departemtentoGet = await Departamentos.findByPk(iddepartamento)
        const emailGet = departemtentoGet.email

        if( (await Departamentos.findOne({where: {email}})) && ( emailGet != email)){
            res.code(400).send({message: "Email já existente no banco de dados"})
            return null
        }

        departamento = await Departamentos.update({departamento, email, descricao, endereco_idendereco, logo}, {where: {iddepartamento}})
        res.code(200).send({message: "Departamento atualizado com sucesso"})
    }catch(err){
        res.code(400).send({message: "Não foi possivel atualizar o departamento"})
    }
  })

  fastify.put('/alteracaoSenhaDepartamento', {onRequest: [fastify.authenticate]}, async(req, res) => {
    try{
        var {senhaAtual, senhaNova} = req.body
        const iddepartamento = req.user.iddepartamento

        const departamento = await Departamentos.findByPk(iddepartamento)

        if(!(await bcrypt.compare(senhaAtual, departamento.senha))){
            res.code(400).send({message: "Senha inválida"})
            return null
        }

        senhaNova = await bcrypt.hash(senhaNova, saltRounds)
        const departamentoAtualizado = await Departamentos.update({senha: senhaNova}, {where: {iddepartamento}})
        res.code(200).send({message: "Senha alterada com sucesso"})
    }catch(err){
        res.code(400).send({message: "Não foi possivel alterar a senha do departamento"})
    }
  })

  fastify.delete("/departamento", { onRequest: [fastify.authenticate] }, async(req, res) => {
    try{
        const departamento = await Departamentos.findByPk(req.user.iddepartamento)
        await departamento.destroy()
        res.code(200).send({message: "Departamento deletado com sucesso"})
    }catch(err){
        res.code(400).send({message: "Não foi possivel deletar o departamento"})
    }
  })
}

module.exports = routes;