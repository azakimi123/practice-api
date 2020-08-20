module.exports = {
  recipeUser: (req, res) => {
      console.log('test hit')
      const db = req.app.get('db');

      db.test.recipe_user()
      .then(data => res.status(200).send(data))
      .catch(err => console.log(err))
  }
}