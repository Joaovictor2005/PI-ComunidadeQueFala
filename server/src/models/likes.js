const { DataTypes } = require('sequelize');
const sequelize = require('../configBD.js'); // Certifique-se de que o caminho está correto
const Reclamacao = require('./reclamacao.js');
const User = require('./user.js');

const Likes = sequelize.define('likes', {}, {timestamps: false})

Likes.belongsTo(Reclamacao, {
    foreignKey: 'reclamacao_idreclamacao',
    allowNull: false
})

Likes.belongsTo(User, {
    foreignKey: 'usuario_idusuario',
    allowNull: false
})

module.exports = Likes