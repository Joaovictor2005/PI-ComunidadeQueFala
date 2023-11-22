const { DataTypes } = require('sequelize');
const sequelize = require('../configBD.js'); // Certifique-se de que o caminho está correto
const Reclamacao = require('./reclamacao.js');
const Anexos = require('./anexos.js');

const ReclamacaoAnexo = sequelize.define('reclamacao_has_anexos', {}, {timestamps: false})

ReclamacaoAnexo.belongsTo(Reclamacao, {
    foreignKey: 'reclamacao_idreclamacao',
    allowNull: false
})

ReclamacaoAnexo.belongsTo(Anexos, {
    foreignKey: 'anexos_idanexos',
    allowNull: false
})

module.exports = Reclamacao