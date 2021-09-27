const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Comment = mongoose.model('Comment', new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  recipeId: { type: Schema.Types.ObjectId, ref: 'Recipe' },
  
},{
  timestamps: true
}))

module.exports = Comment