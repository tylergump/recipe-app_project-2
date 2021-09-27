const express = require('express')
const app = express()

const Recipe = require('../models/recipe');
const Comment = require('../models/comment')

// Got to import the libary
// const moment = require('moment');
module.exports = function (app) {

    app.get('/', (req, res) => {
      Recipe.find()
        .then(recipes => {
          res.render('recipes-index', {recipes: recipes});
        })
        .catch(err => {
          console.log(err);
        });
    });

    // NEW
app.get('/recipes/new', (req, res) => {
    res.render('recipes-new', {title: "New Recipe"});
})

// CREATE
app.post('/recipes', (req, res) => {
    Recipe.create(req.body).then((recipe) => {
      console.log(recipe)
      res.redirect(`/recipes/${recipe._id}`) // Redirect to recipes/:id
    }).catch((err) => {
      console.log(err.message)
    })
  })

  // SHOW
  app.get('/recipes/:id', (req, res) => {
    // find recipe
    Recipe.findById(req.params.id).then(recipe => {
      // fetch its comments
      Comment.find({ recipeId: req.params.id }).then(comments => {
        // respond with the template with both values
        res.render('recipes-show', { recipe: recipe, comments: comments })
      })
    }).catch((err) => {
      // catch errors
      console.log(err.message)
    });
  });

// EDIT
app.get('/recipes/:id/edit', (req, res) => {
    Recipe.findById(req.params.id, function(err, recipe) {
      res.render('recipes-edit', {recipe: recipe, title: "Edit Recipe"});
    })
  })

  // UPDATE
app.put('/recipes/:id', (req, res) => {
    Recipe.findByIdAndUpdate(req.params.id, req.body)
      .then(recipe => {
        res.redirect(`/recipes/${recipe._id}`)
      })
      .catch(err => {
        console.log(err.message)
      })
  })

  // DELETE
app.delete('/recipes/:id', function (req, res) {
    console.log("DELETE recipe")
    Recipe.findByIdAndRemove(req.params.id).then((recipe) => {
      res.redirect('/');
    }).catch((err) => {
      console.log(err.message);
    })
  })
  
  }
