import logger from 'morgan'
import dotenv from 'dotenv'
import { createClient } from '@libsql/client'

import { Server } from 'socket.io'
import { createServer } from 'node:http'

const express = require('express');
const path = require('path');
const app = express();
const port = 3001; // Puerto en el que se ejecutará el servidor

// Middleware para servir archivos estáticos desde la carpeta 'chat'
app.use(express.static(path.join(__dirname, 'chat')));

// Ruta para enviar el archivo index.html cuando se acceda a la raíz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'chat', 'index.html'));
});

// Ruta para procesar el formulario y establecer el nombre de la tabla
app.post('/setTableName', async (req, res) => {
  // Código para procesar el formulario
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

dotenv.config()

const server = createServer(app)
const io = new Server(server, {
  connectionStateRecovery: {}
})

const db = createClient({
  url: 'libsql://firm-infragirl-angelpp1912.turso.io',
  authToken: process.env.DB_TOKEN
})

let tableName // Variable para almacenar el nombre de la tabla

app.use(express.urlencoded({ extended: true })) // Middleware para parsear los datos del formulario

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/client/index.html')
})

// Ruta para procesar el formulario y establecer el nombre de la tabla
app.post('/setTableName', async (req, res) => {
  const { numero } = req.body // Obtiene el número ingresado por el usuario
  tableName = `tabla${numero}` // Concatena el número con el nombre de la tabla
  try {
    // Crear la tabla si no existe
    await db.execute(`
      CREATE TABLE IF NOT EXISTS ${tableName} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content TEXT,
        user TEXT
      )
    `)
    res.redirect('/') // Redirige de vuelta a la página principal
  } catch (error) {
    console.error(error)
    res.status(500).send('Error creating table')
  }
})

server.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

io.on('connection', async (socket) => {
  console.log('a user has connected!')

  socket.on('disconnect', () => {
    console.log('an user has disconnected')
  })

  socket.on('chat message', async (msg) => {
    let result
    const username = socket.handshake.auth.username ?? 'anonymous'
    console.log({ username })
    try {
      result = await db.execute({
        sql: `INSERT INTO ${tableName} (content, user) VALUES (:msg, :username)`,
        args: { msg, username }
      })
    } catch (e) {
      console.error(e)
      return
    }

    io.emit('chat message', msg, result.lastInsertRowid.toString(), username)
  })

  if (!socket.recovered) { // <- recuperase los mensajes sin conexión
    try {
      const results = await db.execute({
        sql: `SELECT id, content, user FROM ${tableName} WHERE id > ?`,
        args: [socket.handshake.auth.serverOffset ?? 0]
      })

      results.rows.forEach(row => {
        socket.emit('chat message', row.content, row.id.toString(), row.user)
      })
    } catch (e) {
      console.error(e)
    }
  }
})

app.use(logger('dev'))
