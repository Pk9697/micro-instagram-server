import { DataTypes } from 'sequelize'
import { sequelize } from '../db/index.js'
import User from './user.model.js'

const Post = sequelize.define('Post', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  images: {
    type: DataTypes.STRING,
    allowNull: false,
    get() {
      return this.getDataValue('images').split(';')
    },
    set(val) {
      this.setDataValue('images', val.join(';'))
    },
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
})

export default Post
