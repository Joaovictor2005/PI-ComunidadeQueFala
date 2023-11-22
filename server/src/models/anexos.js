const { DataTypes } = require('sequelize');
const sequelize = require('../configBD.js'); // Certifique-se de que o caminho está correto

const Anexos = sequelize.define('anexos', {
  idanexos: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  url: {
    type: DataTypes.STRING(400),
    allowNull: false,
    unique: true
  }
}, {
  timestamps: false,
});

module.exports = Anexos;