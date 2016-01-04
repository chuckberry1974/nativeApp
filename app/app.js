// server app js
const express = require('express')
const app = express()

var data = require('./listOfFood.json')
var bodyParser = require('body-parser')

var mongo = require('mongodb').MongoClient

const dbUri = 'mongodb://' +
process.env.MONGODB_USER + ':' +
process.env.MONGODB_PASSWORD + '@' + process.env.MONGODB_URL
// keep connection on
var dbconn
mongo.connect(dbUri, (err, db) => {
  if (err) throw err
  console.log('connected to db')
  dbconn = db
})

app.use(express.static('public'))
app.use(bodyParser.json())
// to get data from mongo database
app.get('/list', function (req, res) {
  dbconn.collection('foodlists')
  .find()
  .toArray((err, foodlists) => {
    if (err) return err
    res.send(JSON.stringify(foodlists, null, 2))
  })
}) // json.stringify MDN to check on (foodlists, null, 2)
// new entry
app.post('/list', (req, res) => {
  const food = req.body
  dbconn.collection('foodlists').insertOne(food)
  .then(function () { res.json('POST/list successful !') })
  .catch(function () {
    res.json('POST /list failed !')
    console.warn('Post /list')
  })
  res.send(food)
})
// put
app.put('/list', (req, res) => {
  console.log('PUT/list')
  const food = req.body
  dbconn.collection('foodlists')
  .update({'name': food.name}, {$set: {'calories': food.calories}})
  .then(function () { res.json('POST/list successful !') })
  .catch(function () {
    res.json('POST /list failed !')
    console.warn('Post /list')
  })
  res.send(food)
})
// remove
app.delete('/list', (req, res) => {
  const food = req.body
  dbconn.collection('foodlists')
  .remove({'name': food.name})
  .then(function () { res.json('DELETE/list successful !') })
  .catch(function () {
    res.json('DELETE/list failed !')
    console.warn('DELETE /list')
  })
  res.send('Deleted')
})
module.exports = app
