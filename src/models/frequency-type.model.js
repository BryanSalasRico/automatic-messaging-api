import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConnection.config.js';

const FrequencyType = sequelize.define('FrequencyType', {
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
  tableName: 'tipos_frecuencia',
  schema: 'alertas',
  timestamps: false,
});

export default FrequencyType;