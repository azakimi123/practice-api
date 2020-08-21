INSERT INTO recipe (
    recipe_id,
    meal_plan_id,
    day,
    meal,
    title
) VALUES (
    ${recipeId},
    ${mealPlanId},
    ${day},
    ${meal},
    ${title}
);