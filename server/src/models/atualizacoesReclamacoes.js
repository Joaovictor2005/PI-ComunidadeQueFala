const { DataTypes, Model, Sequelize } = require('sequelize');
const sequelize = require('../configBD.js'); // Certifique-se de que o caminho está correto

const Reclamacao = require('./reclamacao.js');

const AtualizacoesReclamacoes = sequelize.define('atualizacoes_reclamacoes', {
    idatualizacoes_reclamacoes: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: true,
        autoIncrement: true
    },
    descricao: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    prazo: {
        type: DataTypes.DATE,
        allowNull: false
    },
    data_atualizacao:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
}, {
    timestamps: false
})

AtualizacoesReclamacoes.belongsTo(Reclamacao, {
    foreignKey: 'reclamacao_idreclamacao',
    allowNull: false
})

Reclamacao.hasMany(AtualizacoesReclamacoes, {foreignKey: 'reclamacao_idreclamacao'});

module.exports = AtualizacoesReclamacoes