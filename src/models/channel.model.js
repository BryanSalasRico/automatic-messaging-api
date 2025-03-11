import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConnection.config.js';

const Channel = sequelize.define('Channel', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    field: 'nombre',
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    field: 'activo',
  },
}, {
  tableName: 'canales',
  schema: 'alertas',
  timestamps: false,
});

export default Channel;