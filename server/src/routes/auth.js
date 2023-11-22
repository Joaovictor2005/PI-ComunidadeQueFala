const Departamento = require("../models/departamento");
const User = require("../models/user");
const bcrypt = require('bcrypt');

async function routes(fastify, options) {
  fastify.post("/user/signin", async (req, res) => {
    try{
        const { email, senha } = req.body;
        const user = await User.findOne({where: {email}});
        if(!user){
            res.code(400).send({message: "Email não encontrado"})
            return null
        }
        if(!(await bcrypt.compare(senha, user.senha))){
            res.code(400).send({message: "Senha inválida"})
            return null
        }
        const token = fastify.jwt.sign({ nome: user.nome_completo, }, { sub: user.idusuario.toString(), expiresIn: '30 days' })
        res.code(200).send(token);
    }catch(err){
        res.code(400).send({message: "Não foi possivel autenticar o usuário"})
    }
  });

  fastify.post("/signupdepartamento", async (req, res) => {
    //try{
        const { email, senha } = req.body;
        const departamento = await Departamento.findOne({where: {email}});
        if(!departamento){
            res.code(400).send({message: "Email não encontrado"})
            return null
        }
        if(!(await bcrypt.compare(senha, departamento.senha))){
            res.code(400).send({message: "Senha inválida"})
            return null
        }
        const token = fastify.jwt.sign({ departamento: departamento.departamento, iddepartamento: departamento.iddepartamento}, { sub: "departamento", expiresIn: '30 days' })
        res.code(200).send(token);
    //}catch(err){
    //    res.code(400).send({message: "Não foi possivel autenticar o usuário"})
    //}
  });
}


module.exports = routes;