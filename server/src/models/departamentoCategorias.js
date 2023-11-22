const { DataTypes } = require('sequelize');
const sequelize = require('../configBD.js'); // Certifique-se de que o caminho está correto
const Categorias = require('./categorias.js');
const Departamento = require('./departamento.js');

const CategoriasDepartamento = sequelize.define('categorias_departamento', {}, {timestamps: false})

CategoriasDepartamento.belongsTo(Categorias, {
    foreignKey: 'categorias_idcategorias',
    allowNull: false
})

CategoriasDepartamento.belongsTo(Departamento, {
    foreignKey: 'prefeitura_idprefeitura',
    allowNull: false
})

module.exports = CategoriasDepartamento