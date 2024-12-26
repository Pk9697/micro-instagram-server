# Micro Instagram Server

A Node.js based backend server implementing core Instagram-like features.

## Prerequisites

- Node.js (v14 or higher)
- MySQL database
- npm or yarn package manager

## Setup

1. Clone the repository:
```bash
git clone https://github.com/Pk9697/micro-instagram-server
cd micro-instagram-server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with these variables:
```env
SERVER_PORT = 8000
CORS_ORIGIN = *
MYSQL_DB_NAME = micro_instagram
MYSQL_USER_NAME = root
MYSQL_PASSWORD = 123456
MYSQL_HOST = localhost
ACCESS_TOKEN_SECRET = micro_instagram
ACCESS_TOKEN_EXPIRY = 1d
```

4. Set up MySQL database:
- The database and the tables will be automatically created by Sequelize on server start

## Available Scripts

Development:
```bash
npm run dev
```
This starts the server with nodemon for automatic reloading.

## Project Structure

```
src/
├── index.js          # Server entry point
├── app.js            # Attach middlewares
├── db/               # MYSQL db setup
├── routes/           # API routes
├── models/           # Sequelize models
├── controllers/      # Route controllers
└── middlewares/      # Custom middlewares
└── utils/            # Custom utility functions
.env                  # environment variables outside src folder
.package.json         # metadata of required libraries
```

## Dependencies

- express: Web framework
- sequelize: ORM for MySQL
- mysql2: MySQL client
- jsonwebtoken: JWT authentication
- multer: File upload handling
- cors: Cross-origin resource sharing
- cookie-parser: Cookie parsing middleware
- dotenv: Environment variable management

## Development Dependencies

- nodemon: Development server with hot reload

## License

ISC
