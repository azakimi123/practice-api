import React, { useState, useEffect, useContext } from 'react';
import { RecipeContext } from "../../contexts/RecipeContext";
import { fraction } from "mathjs";
import Axios from 'axios';
import './RecipeView.scss';

function RecipeView(props) {
    // console.log(props.match.params.recipeId)

    let [recipe, setRecipe] = useState([{}]);
    let [test , setTest] = useState(true)
    const [recipeId, setRecipeId] = useContext(RecipeContext);

    useEffect(() => {
        displayRecipe();
    }, [recipeId])

    const displayRecipe = async () => {
        Axios.get(`/api/recipe/${recipeId}`)
        .then(res => {
            setRecipe(res.data);
            // console.log(res.data[0].analyzedInstructions[0].steps)
        });
      };

      console.log(recipe[0])
      console.log(recipeId)
      
    return(
        <div className='recipe-view-container'>
            <div>
                <h1>Recipe View</h1>
            </div>
            {!recipe[0].extendedIngredients
            ? <h1>Loading</h1>
            :  
            <div className='recipe-info'>  
            <section className='recipe-directions'>
                <img className='recipe-pic' src={recipe[0].image} alt='food'/>
                {recipe[0].extendedIngredients.map((amount, i) => (
                <section>
                    <span className='ingredient-amount'>{amount.measures.us.amount}</span>
                    <span className='ingredient-measurement'>{amount.measures.us.unitShort}</span>
                    <span className='ingredient-name'>{amount.name}</span>
                </section>
                ))}
            </section>
            <section  className='recipe-instructions'>
                {recipe[0].analyzedInstructions[0].steps.map((steps, i) => (  
                    <section>
                        <span>{steps.number}</span>
                        <span className='recipe-instructions-step'>{steps.step}</span>
                    </section>
                ))}
            </section>
            </div>}
        </div>
    )
}

export default RecipeView;