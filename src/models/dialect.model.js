import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConnection.config.js';

const Dialect = sequelize.define('Dialect', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: false,
  },
  type: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
    field: 'tipo',
  },
  description: {
    type: DataTypes.STRING(50),
    allowNull: false,
    field: 'descripcion',
  },
}, {
  tableName: 'dialectos_db',
  schema: 'alertas',
  timestamps: false,
});

export default Dialect;