const { DataTypes } = require('sequelize');
const sequelize = require('../configBD.js'); // Certifique-se de que o caminho está correto

const Categorias = sequelize.define('categorias', {
  idcategorias: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  descricao: {
    type: DataTypes.STRING(45),
    allowNull: false,
    unique: true
  }
}, {
  timestamps: false,
});

module.exports = Categorias;