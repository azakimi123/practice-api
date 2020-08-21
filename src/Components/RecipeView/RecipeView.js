import React, { useState, useEffect, useContext } from "react";
import { RecipeIdContext } from "../../contexts/RecipeIdContext";
import { MealPlanIdContext } from '../../contexts/MealPlanIdContext';
import Axios from "axios";
import "./RecipeView.scss";

function RecipeView(props) {
  const [mealPlanId, setMealPlanId] = useContext(MealPlanIdContext);
  const [recipeId, setRecipeId] = useContext(RecipeIdContext);
  const [recipe, setRecipe] = useState([{}]);
  const [day, setDay] = useState('');
  const [meal, setMeal] = useState('');

  //set recipe information to display
  useEffect(() => {
    displayRecipe();
  }, [recipeId]);

  //retrieve recipe data from API
  const displayRecipe = () => {
    Axios.get(`/api/recipe/${recipeId}`)
      .then((res) => {
        setRecipe(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleAdd = () => {
    Axios.post('/api/add-recipe', {recipeId, mealPlanId, day, meal, title: recipe[0].title})
    .then( () => {
      setMeal('')
      setDay('')
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="recipe-view-container">
      <section  className="recipe-view-top">
        <div>
        <div className="selectors">
                      <select className="options" value={day} onChange={e => setDay(e.target.value)}>
                            <option>Sunday</option>
                            <option>Monday</option>
                            <option>Tuesday</option>
                            <option>Wednesday</option>
                            <option>Thursday</option>
                            <option>Friday</option>
                            <option>Saturday</option>
                      </select>
        </div>
        <div>
        <select className="options" value={meal} onChange={e => setMeal(e.target.value)}>
                            <option>Breakfast</option>
                            <option>Lunch</option>
                            <option>Dinner</option>
                      </select>
        </div>
         <button onClick={handleAdd}>Add</button>
        </div>
        <div>
          <h1>{recipe[0].title}</h1>
        </div>
      </section>
      {!recipe[0].extendedIngredients ? (
        <h1>Loading</h1>
      ) : (
        <div className="recipe-info">
          <section className="recipe-directions">
            <img className="recipe-pic" src={recipe[0].image} alt="food" />
            {recipe[0].extendedIngredients.map((amount, i) => (
              <section>
                <span className="ingredient-amount">
                  {amount.measures.us.amount}
                </span>
                <span className="ingredient-measurement">
                  {amount.measures.us.unitShort}
                </span>
                <span className="ingredient-name">{amount.name}</span>
              </section>
            ))}
          </section>
          <section className="recipe-instructions">
            {recipe[0].analyzedInstructions[0].steps.map((steps, i) => (
              <section>
                <span>{steps.number}</span>
                <span className="recipe-instructions-step">{steps.step}</span>
              </section>
            ))}
          </section>
        </div>
      )}
    </div>
  );
}

export default RecipeView;


{/* <input value={day} placeholder='day' onChange={e => setDay(e.target.value)}/>
<input value={meal} placeholder='meal' onChange={e => setMeal(e.target.value)} /> */}
