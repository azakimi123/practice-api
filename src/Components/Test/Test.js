import Axios from "axios";
import React, { useState, useContext } from "react";
import {Link} from 'react-router-dom';
import { UserContext } from "../../contexts/UserContext";
import { RecipeContext } from "../../contexts/RecipeContext";
import RecipeView from '../RecipeView/RecipeView';
import "./Test.scss";

export default () => {
  const [userData] = useContext(UserContext);
  const [recipeId, setRecipeId] = useContext(RecipeContext);
  const [recipes, setRecipes] = useState([]);
  const [day, setDay] = useState('');
  const [meal, setMeal] = useState('');
  const [searchQuery, setSearchQuery] = useState("");

  const search = async () => {
    let res = await Axios.get("/test/spoonacular", { params: { query: searchQuery } });
    setRecipes(res.data.results);
  };

  console.log(recipeId)
  return (
    <div className="test-comp">
      <label>{userData.username}</label>
      <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      <button onClick={search}>Search</button>
      <section className='selection-field'>
        <input
          value={day}
          placeholder='day'
          onChange={e => setDay(e.target.value)}/>
        <input
          value={meal}
          placeholder='meal'
          onChange={e => setMeal(e.target.value)}/>
        <button>ADD</button>
      </section>
      <section className='test-layout'>
        <div>
          <RecipeView />
        </div>
        <div className='right-layout'>
          <section className='recipe-search'>
            {recipes.map((recipe, i) => (
              <section key={i} className="recipe-test">
                {console.log(recipe)}
                <section className='recipe-img-container'>
                   <img 
                      onClick={()=>setRecipeId(recipe.id)}
                      className='recipe-img' 
                      src={`https://spoonacular.com/recipeImages/${recipe.image}`} 
                      alt="recipe" />
               </section>
               <label className='recipe-title' >{recipe.title}</label>
             </section>
           ))}
         </section>
        </div>
      </section>
    </div>
  );
};


// https://spoonacular.com/recipeImages/

// `https://spoonacular.com/recipeImages/${recipe.image}`

// [
//   {
//       "id": 607224,
//       "title": "Pie Cake",
//       "image": "https://spoonacular.com/recipeImages/607224-312x231.jpg",
//       "imageType": "jpg"
//   },
//   {
//       "id": 451625,
//       "title": "Pie Cake",
//       "image": "https://spoonacular.com/recipeImages/451625-312x231.jpg",
//       "imageType": "jpg"
//   },
//   {
//       "id": 395729,
//       "title": "Pie Crust",
//       "image": "https://spoonacular.com/recipeImages/395729-312x231.jpeg",
//       "imageType": "jpeg"
//   },
//   {
//       "id": 539848,
//       "title": "Pie Crust",
//       "image": "https://spoonacular.com/recipeImages/539848-312x231.jpg",
//       "imageType": "jpg"
//   },
//   {
//     "id": 637876,
//     "title": "Chicken 65",
//     "image": "https://spoonacular.com/recipeImages/637876-312x231.jpg",
//     "imageType": "jpg"
// },

//   {
//       "id": 69835,
//       "title": "Pie For Mikey",
//       "image": "https://spoonacular.com/recipeImages/69835-312x231.jpg",
//       "imageType": "jpg"
//   }
// ]