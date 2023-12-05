const fastify = require("fastify")({ logger: true });
const sequelize = require("./configBD");

sequelize
  .authenticate()
  .then(() => {
    console.log(
      "Connection to the database has been established successfully."
    );
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
});

fastify.decorate("authenticate", async function (req, res) {
  try {
    await req.jwtVerify();
  } catch (err) {
    res.code(401).send({message: "Faça login"});
  }
});

fastify.register(require('@fastify/multipart'))
fastify.register(require("@fastify/jwt"), { secret: "comunidade",});

fastify.register(require("./routes/user"));
fastify.register(require("./routes/auth"));
fastify.register(require("./routes/upload"));
fastify.register(require("./routes/departamento"));
fastify.register(require("./routes/reclamacao"));
fastify.register(require("./routes/likes"));
fastify.register(require("./routes/favoritos"));
fastify.register(require("./routes/atualizacaoReclamacao"));
fastify.register(require("./routes/comentarios"));

fastify.listen({ port: 80 }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
