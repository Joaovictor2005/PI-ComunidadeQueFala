const { DataTypes } = require('sequelize');
const sequelize = require('../configBD.js'); // Certifique-se de que o caminho está correto
const Endereco = require('./endereco.js');
const Anexos = require('./anexos.js');

const Departamento = sequelize.define('departamento', {
    iddepartamento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    departamento: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    senha: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'departamento'
})

Departamento.belongsTo(Endereco, {
    foreignKey: 'endereco_idendereco',
    allowNull: false
})

Departamento.belongsTo(Anexos, {
    foreignKey: 'logo'
})

module.exports = Departamento