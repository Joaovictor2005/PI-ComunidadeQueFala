const { DataTypes } = require('sequelize');
const sequelize = require('../configBD.js'); // Certifique-se de que o caminho está correto

const Cidade = sequelize.define('cidade', {
  idcidade: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  estado: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  cidade: {
    type: DataTypes.STRING(45)
  }
},{
  timestamps: false,
  tableName: 'cidade'
});

module.exports = Cidade;