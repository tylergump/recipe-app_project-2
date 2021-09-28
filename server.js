const express = require('express')
const Handlebars = require('handlebars')
const app = express()
const expressHandlebars = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

app.engine('handlebars', expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine', 'handlebars');

app.use(express.static('public'))

// INITIALIZE BODY-PARSER AND ADD IT TO APP
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

const recipes = require('./controllers/recipeController')(app);
const comments = require('./controllers/commentController')(app);
  
  const mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost/recipes', { useNewUrlParser: true });
  





  //LISTEN

  app.listen(3000, () => {
    console.log('App listening on port 3000!')
  })