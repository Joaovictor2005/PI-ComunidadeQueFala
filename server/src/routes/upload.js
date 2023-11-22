const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const pump = promisify(require("pump"));
const Anexos = require("../models/anexos");

const allowedFileTypes = ["image/jpeg", "image/jpg","image/png"]; // Tipos de arquivo permitidos
const maxFileSize = 1024 * 1024 * 10; // Tamanho máximo do arquivo em bytes (exemplo para 2MB)

async function routes(fastify, options) {
  fastify.post("/upload", async (req, res) => {
    try{
    const data = await req.file();

      // Verifica se o arquivo é do tipo permitido
      if (!allowedFileTypes.includes(data.mimetype)) {
        return res.code(400).send({ message: "Tipo de arquivo não permitido" });
      }

      // Verifica o tamanho do arquivo
      if (data.file.length > maxFileSize) {
        return res.code(400).send({ message: "Arquivo excede o tamanho máximo permitido" });
      }

      // Renomeia o arquivo para um timestamp
      const timestamp = Date.now();
      const newFileName = `${timestamp}.${data.filename.split(".").pop()}`;

      // Salva o arquivo em uma pasta específica
      const uploadPath = path.join(__dirname, "../../uploads", newFileName);
      
      await pump(data.file, fs.createWriteStream(uploadPath));

      const {idanexos} = await Anexos.create({url: newFileName})
      
      res.code(200).send({ message: "Arquivo recebido e salvo com sucesso", idanexos });
    }catch(err){
      res.code(400).send({message: "Erro ao fazer upload do arquivo"})
    }
  });

  fastify.get("/upload/:id", async (req, res) => {
    try{
      const {id} = req.params
      const { url } = await Anexos.findByPk(id)
      res.code(200).send({url});
    }catch(err){
      res.code(400).send({message: "Erro ao achar anexo"})
    }
  })

  fastify.delete("/upload", async (req, res) => {
    try{
      const {id} = req.body
      const anexo = await Anexos.findByPk(id)
      if(!anexo){
        res.code(400).send({message: "Anexo não existe"})
        return 
      }
      const url = "C:/Users/João_Victor/Documents/PROGRAMACAO/Sanea/server/uploads/" + anexo.url 
      

      fs.unlinkSync(url)

      await anexo.destroy()
      res.code(200).send({message: "Anexo deletado"});
    }catch(err){
      res.code(400).send({message: "Erro ao deletar anexo"})
    }
  })
}

module.exports = routes;
