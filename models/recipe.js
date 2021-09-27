const mongoose = require('mongoose');
const Comment = require('../models/comment')


const Recipe = mongoose.model('Recipe', new mongoose.Schema({
  title: {
      type: String,
      required: true
    },
  author: {
      type: String,
      required: true
  },
  image: { type: String},
  ingredients: {
      type: String,
      required: true
  },
  recipe: {
      type: String,
      required: true
  }
    
}, {
    timestamps: true
  }))

module.exports = Recipe;