import { Sequelize } from 'sequelize';
import get from 'lodash';
import axios from 'axios';
import DataSourceDB from '../models/data-sources-db.model.js'
import DataSourceService from '../models/data-sources-service.model.js';
import Dialect from '../models/dialect.model.js';


export const getDataSourceService = async (dataSourceId) => {
    try {
        const dataSource =await DataSourceService.findOne({
            where: { id: dataSourceId }
        })

        const url = `${dataSource.urlBase}${dataSource.endpoint}`;
        const config = {
            method: dataSource.httpMethod,
            url,
        };

        if (dataSource.headersParams) {
            if (typeof dataSource.headersParams === "string") {
                config.headers = JSON.parse(dataSource.headersParams);
            } else {
                config.headers = dataSource.headersParams;
            }
        }
        else{
            config.headers = {};
        }
        

        if (dataSource.queryParams) {
            if (typeof dataSource.queryParams === "string") {
                config.params = JSON.parse(dataSource.queryParams);
            } else {
                config.params = dataSource.queryParams;
            }
        }

        if (dataSource.httpMethod !== 'GET' && dataSource.bodyParams) {
            if (typeof dataSource.bodyParams === "string") {
                config.data = JSON.parse(dataSource.bodyParams);
            } else {
                config.data = dataSource.bodyParams;
            }
        }

        console.log('config', config)
        const response = await axios(config);
        console.log('response', response)
        const specificData = dataSource.responsePath
        ? get(response.data, dataSource.responsePath)
        : response.data;
        if (!specificData) {
            console.error(`La ruta "${dataSource.data_path}" no se encontro en la respuesta`);
        }

        if (Array.isArray(specificData) && specificData.every(item => typeof item === 'string')) {
            return specificData;
        } else {
            console.error('La respuesta no es una lista de strings válida.');
        }
        return[];
    } catch (error) {
        console.error('Error al cargar fuente:', error);
        throw error;
    }
}

export const getDataSourceDB = async (dataSourceId) => {
    try{
        const dataSource =await DataSourceDB.findOne({
            where: { id: dataSourceId }
        })
        var destinationsList = [];
    
        if(dataSource){

            const dialect = await Dialect.findOne({
                where: { id: dataSource.dialectId}
            })
            
            const db = new Sequelize( dataSource.nameDB, dataSource.user, dataSource.password, {
                host: dataSource.host,
                port: dataSource.port,
                dialect: dialect.type,
                logging: false
            });

            try {
                const result = await db.query(dataSource.querySql, { type: Sequelize.QueryTypes.SELECT });
                destinationsList = result.map(row => Object.values(row)[0]);
            } catch (error) {
                console.error(`Error al ejecutar query en ${dataSource.nameDB}:`, error.message);
            } finally {
                await db.close();
            }
        }
        return destinationsList;
    }catch(error){
        console.error('Error al cargar fuente:', error);
        throw error;
    }
}


export const saveDataSourceService = async (dataSource, transaction = null) => {
    
    return await DataSourceService.create({
        serviceName: dataSource.serviceName,
        urlBase: dataSource.urlBase,
        endpoint: dataSource.endpoint,
        httpMethod: dataSource.httpMethod,
        headersParams: dataSource.headersParams,
        bodyParams: dataSource.bodyParams,
        queryParams: dataSource.queryParams,
        responsePath: dataSource.responsePath,
    }, transaction ? { transaction } : {});
}