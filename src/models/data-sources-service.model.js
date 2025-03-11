import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConnection.config.js';

const DataSourceService = sequelize.define('DataSourceService', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    serviceName: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'nombre_servicio',
    },
    urlBase: {
        type: DataTypes.STRING(1000),
        allowNull: false,
        field: 'url_base',
    },
    endpoint : {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'endpoint',
    },
    httpMethod: {
        type: DataTypes.STRING(15),
        allowNull: false,
        field: 'metodo_http',
    },
    headersParams: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'parametros_headers',
    },
    bodyParams: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'parametros_body',
    },
    queryParams: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'parametros_query',
    },
    responsePath: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: 'ruta_respuesta',
    },
}, {
tableName: 'fuentes_datos_service',
schema: 'alertas',
timestamps: false,
});

export default DataSourceService;