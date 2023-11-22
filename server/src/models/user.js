const { DataTypes } = require('sequelize');
const sequelize = require('../configBD.js'); // Certifique-se de que o caminho está correto

const Anexos = require('./anexos')
const Endereco = require('./endereco')

const User = sequelize.define('usuario', {
  idusuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  nome_completo: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  data_nascimento: {
    type: DataTypes.DATE
  },
  email: {
    type: DataTypes.STRING(200),
    allowNull: false,
    unique: true
  },
  senha: {
    type: DataTypes.STRING(60),
    allowNull: false
  },
  cpf: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    unique: true
  },
  telefone: {
    type: DataTypes.INTEGER(11),
    allowNull: false
  }
},{
  // Define o nome da tabela no banco de dados
  tableName: 'usuario',
  timestamps: false,
});

User.belongsTo(Anexos, {
    foreignKey: 'imagem_perfil',
    allowNull: true
})

User.belongsTo(Endereco, {
    foreignKey: 'endereco_idendereco',
    allowNull: false
})
module.exports = User;