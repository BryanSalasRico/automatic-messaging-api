import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConnection.config.js';
import Message from './message.model.js';
import Program from './program.model.js';

const Log = sequelize.define('Log', {
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
  programId: {
    type: DataTypes.INTEGER,
    references: {
      model: Program,
      key: 'id',
    },
    field: 'programa_id',
  },
  sendDate: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'fecha_envio',
  },
  SuccessReport: {
    type: DataTypes.TEXT,
    field: 'reporte_exito',
  },
  ErrorReport: {
    type: DataTypes.TEXT,
    field: 'reporte_error',
  },
  creationDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'fecha_creacion',
  },
}, {
  tableName: 'logs',
  schema: 'alertas',
  timestamps: false,
});

export default Log;