const { DataTypes } = require('sequelize');
const sequelize = require('../configBD.js'); // Certifique-se de que o caminho está correto
const Reclamacao = require('./reclamacao.js');
const User = require('./user.js');

const Favoritos = sequelize.define('favoritos', {}, {timestamps: false})

Favoritos.belongsTo(Reclamacao, {
    foreignKey: 'reclamacao_idreclamacao',
    allowNull: false
})

Favoritos.belongsTo(User, {
    foreignKey: 'usuario_idusuario',
    allowNull: false
})

module.exports = Favoritos