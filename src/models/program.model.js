import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConnection.config.js';
import Message from './message.model.js';
import FrequencyType from './frequency-type.model.js';
import DataSourceDB from './data-sources-db.model.js';
import DataSourceService from './data-sources-service.model.js';

const Program = sequelize.define('Program', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  messageId: {
    type: DataTypes.INTEGER,
    references: {
      model: Message,
      key: 'id',
    },
    field: 'mensaje_id',
  },
  frequencyTypeId: {
    type: DataTypes.INTEGER,
    references: {
      model: FrequencyType,
      key: 'id',
    },
    field: 'tipo_frecuencia_id',
  },
  intervalMinutes: {
    type: DataTypes.INTEGER,
    field: 'minutos_intervalo',
  },
  nextExecution: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'proxima_ejecucion',
  },
  lastExecution: {
    type: DataTypes.DATE,
    field: 'ultima_ejecucion',
  },
  initialDate: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'fecha_inicio',
  },
  endDate: {
    type: DataTypes.DATE,
    field: 'fecha_fin',
  },
  creationDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'fecha_creacion',
  },
  active: {
    type: DataTypes.BOOLEAN,
    field: 'activo'
  },
  dataSourceDbId: {
    type: DataTypes.INTEGER,
    references: {
      model: DataSourceDB,
      key: 'id',
    },
    field: 'fuente_datos_db_id',
  },
  dataSourceServiceId: {
    type: DataTypes.INTEGER,
    references: {
      model: DataSourceService,
      key: 'id',
    },
    field: 'fuente_datos_service_id',
  },
}, {
  tableName: 'programas',
  schema: 'alertas',
  timestamps: false,
});

export default Program;