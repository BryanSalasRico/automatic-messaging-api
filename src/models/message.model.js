import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConnection.config.js';
import Channel from './channel.model.js';

const Message = sequelize.define('Message', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
    field: 'titulo',
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    field: 'contenido',
  },
  channelId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Channel,
      key: 'id',
    },
    field: 'canal_id',
  },
  createDate : {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'fecha_creacion',
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'activo',
  },
}, {
  tableName: 'mensajes',
  schema: 'alertas',
  timestamps: false,
});

export default Message;