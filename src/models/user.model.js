import { DataTypes } from 'sequelize'
import { sequelize } from '../db/index.js'
import Post from './post.model.js'

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(256),
    allowNull: false,
  },
  mobileNumber: {
    type: DataTypes.BIGINT,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(256),
    allowNull: false,
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  postCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
})

export default User
