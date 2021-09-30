const express = require('express')
const Handlebars = require('handlebars')
const app = express()
const expressHandlebars = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const methodOverride = require('method-override')
app.use(methodOverride('_method'))
const mongoose = require('mongoose')
require('dotenv').config()

//CONNECTIONS

const PORT = process.env.PORT

const MONGODB_URI = process.env.MONGODB_URI

console.log(MONGODB_URI)

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, () => {
	console.log('db connected');
})

const db = mongoose.connection

db.on('connected', () => {
	console.log('mongoose connected to', MONGODB_URI);
})
db.on('disconnected', () => {
	console.log('mongoose disconnected to', MONGODB_URI);
})
db.on('error', (error) => {
	console.log('mongoose error', error);
})

app.engine('handlebars', expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine', 'handlebars');

app.use(express.static('public'))

// INITIALIZE BODY-PARSER AND ADD IT TO APP
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

const recipes = require('./controllers/recipeController')(app);
const comments = require('./controllers/commentController')(app);
  

  





  //LISTEN

  app.listen(PORT, () => {
    console.log('listening on port:', PORT);
  })