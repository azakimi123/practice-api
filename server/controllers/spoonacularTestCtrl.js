const Axios = require("axios");

const { SPOONACULAR_API_KEY } = process.env;

const recipeSearchEndpoint = "https://api.spoonacular.com/recipes/search";

const recipeId = 'https://api.spoonacular.com/recipes/informationBulk';

module.exports = {
  testQuery: async (req, res) => {
    const apiRes = await Axios.get(recipeSearchEndpoint, {
      params: {
        apiKey: SPOONACULAR_API_KEY,
        query: req.query.query,
        number: 5,
        instructionsRequired: true
      }
    });
    res.status(200).send(apiRes.data);
  },

  oneRecipe: async (req, res) => {
    console.log('recipe view hit')
    const {id} = req.params;
    const apiRes = await Axios.get(`https://api.spoonacular.com/recipes/informationBulk?apiKey=${SPOONACULAR_API_KEY}&ids=${id}`);
    console.log(apiRes.data);
    res.status(200).send(apiRes.data);
  }
};
