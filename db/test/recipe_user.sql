SELECT r.recipe_id, r.meal_plan_id, r.meal, r.day, mp.user_id
FROM recipe r
JOIN meal_plan mp ON r.meal_plan_id = mp.id 
JOIN meal_app_users u ON mp.user_id = u.id
WHERE u.id = 4
ORDER BY day;