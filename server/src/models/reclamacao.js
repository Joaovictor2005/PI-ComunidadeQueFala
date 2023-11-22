const { DataTypes } = require('sequelize');
const sequelize = require('../configBD.js'); // Certifique-se de que o caminho está correto

const Categorias = require('./categorias')
const Endereco = require('./endereco');
const Departamento = require('./departamento.js');

const Reclamacao = sequelize.define('reclamacao', {
  idreclamacao: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  descricao: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  data_reclamacao: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.NOW
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'reclamacao'
});

Reclamacao.belongsTo(Categorias, {
    foreignKey: 'categorias_idcategorias',
    allowNull: false
})

Reclamacao.belongsTo(Endereco, {
    foreignKey: 'endereco_idendereco',
    allowNull: false
})

Reclamacao.belongsTo(Departamento, {
  foreignKey: 'departamento_iddepartamento',
})


module.exports = Reclamacao;