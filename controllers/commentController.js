const Comment = require('../models/comment');

module.exports = (app) => {

    // CREATE Comment
    app.post('/recipes/comments', (req, res) => {
      Comment.create(req.body).then((comment) => {
        console.log(comment)
        res.redirect(`/recipes/${comment.recipeId}`);
      }).catch((err) => {
        console.log(err.message);
      });
    });

    // DELETE
app.delete('/recipes/comments/:id', function (req, res) {
    console.log("DELETE comment")
    Comment.findByIdAndRemove(req.params.id).then((comment) => {
      res.redirect(`/recipes/${comment.recipeId}`);
    }).catch((err) => {
      console.log(err.message);
    })
  })
}