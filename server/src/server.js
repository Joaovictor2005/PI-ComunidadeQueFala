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

fastify.decorate("authenticatePass", async function (req, res) {
  try {
    await req.jwtVerify();
  } catch (err) {
    req.user = null
  }
});

fastify.register(require('@fastify/multipart'))
fastify.register(require('@fastify/cors'))
fastify.register(require("@fastify/jwt"), { secret: "comunidade",});

fastify.register(require("./routes/user"), {prefix: '/api'});
fastify.register(require("./routes/auth"), {prefix: '/api'});
fastify.register(require("./routes/upload"), {prefix: '/api'});
fastify.register(require("./routes/departamento"), {prefix: '/api'});
fastify.register(require("./routes/reclamacao"), {prefix: '/api'});
fastify.register(require("./routes/likes"), {prefix: '/api'});
fastify.register(require("./routes/favoritos"), {prefix: '/api'});
fastify.register(require("./routes/atualizacaoReclamacao"), {prefix: '/api'});
fastify.register(require("./routes/comentarios"), {prefix: '/api'});
fastify.register(require("./routes/categorias"), {prefix: '/api'});

fastify.listen({ port: 3301 }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
