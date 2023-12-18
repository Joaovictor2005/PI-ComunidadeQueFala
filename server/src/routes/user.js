const Anexos = require("../models/anexos");
const Cidade = require("../models/cidade");
const Endereco = require("../models/endereco");
const User = require("../models/user");
const bcrypt = require('bcrypt');
const saltRounds = 10; // Número de rounds de geração de salt

async function routes(fastify, options) {
  fastify.get("/user/profile", { onRequest: [fastify.authenticate] }, async (req, res) => {
    try{
      const user = await User.findByPk(req.user.sub, {
        include: [
          {model: Anexos},
          {
            model: Endereco,
            include: [{model: Cidade}]
          }
        ]
      });
      
      const userResponse = {
        idusuario: user.idusuario,
        nome_completo: user.nome_completo,
        data_nascimento: user.data_nascimento,
        email: user.email,
        cpf: user.cpf,
        telefone: user.telefone,
        imagem_perfil: user.anexo ? user.anexo.url : null,
        cep: user.endereco.cep,
        idcidade: user.endereco.cidade.idcidade,
        estado: user.endereco.cidade.estado,
        cidade: user.endereco.cidade.cidade,
        bairro: user.endereco.bairro,
        endereco: user.endereco.endereco,
        numero: user.endereco.numero,
        complemento: user.endereco.complemento,
        pontoReferencia: user.endereco.pontoReferencia
      }

      res.code(200).send(userResponse);
    }catch(err){
      res.code(400).send({message: "Erro ao buscar o usuário"})
    }
  });

  fastify.put("/user/alteracaoSenha", { onRequest: [fastify.authenticate] }, async (req, res) => {
    try{
      var {senhaAtual, senhaNova} = req.body
      const user = await User.findByPk(req.user.sub);
      if(!(await bcrypt.compare(senhaAtual, user.senha))){
        res.code(400).send({message: "Senha inválida"})
        return 
      }
      senhaNova = await bcrypt.hash(senhaNova, saltRounds)
      const userAtualizado = await User.update({senha: senhaNova}, {where: {idusuario: req.user.sub}})
      res.code(200).send({message: "Senha atualizada com sucesso"})
    }catch(err){
      res.code(400).send({message: "Erro ao atualizar senha"})
    }
  });

  fastify.put("/user", { onRequest: [fastify.authenticate] }, async (req, res) => {
    try{
      var {nome_completo, data_nascimento, email, telefone, cep, estado, cidade, bairro, endereco, numero, complemento, pontoReferencia } = req.body;
    
      const userGet = await User.findByPk(req.user.sub)

      //Avalição do email. Se jé o mesmo ou se já existe em outra conta no sistema
      const emailGet = userGet.email
      if( (await User.findOne({where: {email}})) && ( emailGet != email) ){
        res.code(400).send({message: "Email já existente no banco de dados"})
        return 
      }

      //Cidade
      var cidade_create = await Cidade.findOne({where: {estado, cidade}})
      if(!cidade_create){
        await Cidade.create({estado, cidade})
      }

      const cidade_idcidade = cidade_create.idcidade

      //Atualização do endereço
      const {endereco_idendereco} = userGet
      await Endereco.update({cep, cidade_idcidade, bairro, endereco, numero, complemento, pontoReferencia}, {where: {idendereco: endereco_idendereco}})
      
      //Atualização do usuário final
      const user = await User.update({nome_completo, data_nascimento, email, telefone}, {where: {idusuario: req.user.sub}})
      res.code(200).send({message: "Usuário atualizado com sucesso"})
    }catch(err){
      res.code(400).send({message: "Erro ao atualizar usuário"})
    }
  });

  fastify.put('/user/alteracaoImagemPerfil', { onRequest: [fastify.authenticate] }, async(req, res) => {
    try{
      const idusuario = req.user.sub

      const {imagem_perfil} = req.body

      const user = await User.update({imagem_perfil}, {where: {idusuario}})

      res.code(200).send({message: "Imagem de perfil do usuário atualizada com sucesso"})
    }catch(err){
      res.code(400).send({message: "Erro ao atualizar a imagem de perfil do usuário"})
    }
  })

  fastify.get("/user/:id", async (req, res) => {
    try{
      const { id } = req.params;
      const user = await User.findByPk(id, {include: Anexos, attributes: ["idusuario", "nome_completo"]});
      
      if(!user){
        res.code(400).send({message: "ID de usuário inexistente"})
        return
      }
      
      const userResponse = {
        idusuario: user.idusuario,
        nome_completo: user.nome_completo,
        imagem_perfil: user.anexo ? user.anexo.url : null
      }
      res.code(200).send(userResponse);

    }catch(err){
      res.code(400).send({message: "Erro ao buscar usuário"})
    }
  });

  fastify.get("/user", async (req, res) => {
    try{
      const users = await User.findAll({include: Anexos, attributes: ["idusuario", "nome_completo"]});

      const usersResponse = users.map(user => {
        return {
          idusuario: user.idusuario,
          nome_completo: user.nome_completo,
          imagem_perfil: user.anexo ? user.anexo.url : null
        }
      })

      res.code(200).send(usersResponse);
    }catch(err){
      res.code(400).send({message: "Erro ao buscar os usuários"})
    }
  });

  fastify.post("/user", async (req, res) => {
    try{
      var {nome_completo, data_nascimento, email, senha, cpf, telefone, imagem_perfil, cep, estado, cidade, bairro, endereco, numero, complemento, pontoReferencia } = req.body;
      
      if(await User.findOne({where: {email}})){
        res.code(400).send({message: "Email já existente. Faça login"})
        return 
      }
      if(await User.findOne({where: {cpf}})){
        res.code(400).send({message: "CPF já existente. Faça login"})
        return 
      }

      //Cidade
      var cidade_create = await Cidade.findOne({where: {estado, cidade}})
      if(!cidade_create){
        cidade_create = await Cidade.create({estado, cidade})
      }

      const cidade_idcidade = cidade_create.idcidade

      //Endereço
      const enderecoCreate = await Endereco.create({cep, cidade_idcidade, bairro, endereco, numero, complemento, pontoReferencia})
      const endereco_idendereco = enderecoCreate.idendereco
      
      senha = await bcrypt.hash(senha, saltRounds)//Criptografar senha

      const user = await User.create({ nome_completo, data_nascimento, email, senha, cpf, telefone, imagem_perfil, endereco_idendereco});
      const userId = user.idusuario;
      res.send({ success: true, message: "Usuário criado com sucesso", userId });
    }catch(err){
      res.code(400).send({message: "Erro na criação do usuário"})
    }
  });

  fastify.delete("/user", { onRequest: [fastify.authenticate] }, async (req, res) => {
    try {
      const user = await User.findByPk(req.user.sub);
      await user.destroy();
      res.code(200).send({ message: "Usuário deletado" });
    } catch (err) {
      res.code(400).send({ message: "Erro ao deletar usuário" });
    }
  });
}

module.exports = routes;
