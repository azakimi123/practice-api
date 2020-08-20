import React from "react";
import { Switch, Route } from "react-router-dom";
import Test from "./Components/Test/Test";
import Auth from "./Components/Auth/Auth";
import RecipeView from "./Components/RecipeView/RecipeView";
import MealPlan from "./Components/MealPlan/MealPlan";

export default (
  <Switch>
    <Route exact path="/" component={Auth} />
    <Route path="/test" component={Test} />
    <Route path='/recipeView/:recipeId' component={RecipeView} />
    <Route path="/meal-plan" component={MealPlan} />
    <Route render={() => <main>404 Not Found</main>} />
  </Switch>
);
