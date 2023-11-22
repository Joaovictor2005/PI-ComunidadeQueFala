const { DataTypes } = require('sequelize');
const sequelize = require('../configBD.js'); // Certifique-se de que o caminho está correto

const Cidade = require('./cidade')

const Endereco = sequelize.define('endereco', {
  idendereco: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  cep: {
    type: DataTypes.INTEGER(8),
    allowNull: false
  },
  bairro: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  endereco: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  numero: {
    type: DataTypes.STRING(10)
  },
  complemento: {
    type: DataTypes.STRING(45)
  },
  pontoReferencia: {
    type: DataTypes.STRING(45)
  }
}, {
  timestamps: false,
  tableName: 'endereco'
});

Endereco.belongsTo(Cidade, {
    foreignKey: 'cidade_idcidade',
    allowNull: false
})
module.exports = Endereco;