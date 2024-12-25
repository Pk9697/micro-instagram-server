import { Sequelize } from 'sequelize'
import mysql from 'mysql2/promise'

const host = process.env.MYSQL_HOST
const port = process.env.MYSQL_PORT
const user = process.env.MYSQL_USER_NAME
const password = process.env.MYSQL_PASSWORD
const database = process.env.MYSQL_DB_NAME

const sequelize = new Sequelize(database, user, password, {
  host,
  dialect: 'mysql',
})

const connectDb = async () => {
  try {
    const connection = await mysql.createConnection({
      host,
      port,
      user,
      password,
    })
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`)
    await sequelize.authenticate()
    console.log(`MYSQL connected !!`)
    await sequelize.sync()
    console.log('All models were synchronized successfully.')
  } catch (err) {
    console.error('MYSQL connection error', err)
    process.exit(1)
  }
}

export { sequelize, connectDb }
