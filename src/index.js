import dotenv from 'dotenv'
import app from './app.js'
import { connectDb } from './db/index.js'

dotenv.config({
  path: './.env',
})

const PORT = process.env.SERVER_PORT || 8000

connectDb()
  .then(() => {
    app.listen(PORT, (err) => {
      if (err) {
        console.error(`Error in running server : ${err}`)
        process.exit(1)
      }
      console.log(`Server is running on PORT ${PORT}`)
    })
  })
  .catch((err) => console.error('MYSQL connection failed !!!', err))
