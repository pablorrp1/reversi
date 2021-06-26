const tablero = require("./public/tablero.js")
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => {
    let query = req.query
    const ntab = new tablero(query.estado, parseInt(query.turno))
    let r = ntab.minmax()
    res.send(r[1]+"")
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
