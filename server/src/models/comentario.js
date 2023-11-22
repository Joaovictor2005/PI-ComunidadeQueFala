const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../configBD.js'); // Certifique-se de que o caminho está correto
const Reclamacao = require('./reclamacao.js');
const User = require('./user.js');

const Comentario = sequelize.define('comentario', {
    idcomentario: {
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true, 
        allowNull: false
    },
    data: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    comentario: {
        type: DataTypes.STRING(200),
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'comentario'
})

Comentario.belongsTo(Reclamacao, {
    foreignKey: 'reclamacao_idreclamacao',
    allowNull: false
})

Comentario.belongsTo(User, {
    foreignKey: 'usuario_idusuario',
    allowNull: false
})

module.exports = Comentario