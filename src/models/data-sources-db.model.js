import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConnection.config.js';
import Dialect from './dialect.model.js';

const DataSourceDB = sequelize.define('DataSourceDB', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    host: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'host',
    },
    port: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'puerto',
    },
    user : {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'usuario',
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'clave',
    },
    nameDB: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'nombre_db',
    },
    dialectId: {
        type: DataTypes.INTEGER,
        references: {
          model: Dialect,
          key: 'id',
        },
        field: 'tipo_dialecto_id',
    },
    querySql: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'query_sql',
    },
}, {
tableName: 'fuentes_datos_db',
schema: 'alertas',
timestamps: false,
});

export default DataSourceDB;