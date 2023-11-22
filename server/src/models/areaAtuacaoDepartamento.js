const { DataTypes } = require('sequelize');
const sequelize = require('../configBD.js'); // Certifique-se de que o caminho está correto
const Departamento = require('./departamento.js');
const Cidade = require('./cidade.js');

const AreaAtuacaoDepartamento =  sequelize.define('area_atuacao_departamento', {}, {timestamps: false})

AreaAtuacaoDepartamento.belongsTo(Departamento, {
    foreignKey: 'prefeitura_idprefeitura',
    allowNull: false
})

AreaAtuacaoDepartamento.belongsTo(Cidade, {
    foreignKey: 'cidade_idcidade',
    allowNull: false
})

module.exports = AreaAtuacaoDepartamento