const express = require('express')
const app = express()
const PORT = 3333

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204)
  }

  next()
})
app.use(express.json())

app.use('/pessoas', require('./routes/pessoas'))

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})



// const jsonServer = require('json-server')
// const server = jsonServer.create()
// const router = jsonServer.router('../db.json')
// const middlewares = jsonServer.defaults()
// const PORT = 3000

// server.use(middlewares)
// server.use(router)

// server.listen(PORT, () => {
//   console.log(`JSON Server is running in http://localhost:${PORT}`)
// })
