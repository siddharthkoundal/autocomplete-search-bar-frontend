const RecipeCard = ({ recipe }) => {
    return (
        <div className="recipe-card">
            <h2>{recipe.name}</h2>
            <img src={recipe.image} alt={recipe.name} className="recipe-image" />
            <p><strong>Cuisine:</strong> {recipe.cuisine}</p>
            <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
            <p><strong>Preparation time:</strong> {recipe.prepTimeMinutes} minutes</p>
            <p><strong>Cooking time:</strong> {recipe.cookTimeMinutes || recipe.cookingTime} minutes</p>
            <p><strong>Servings:</strong> {recipe.servings}</p>
            <p><strong>Calories per serving:</strong> {recipe.caloriesPerServing}</p>
            <p><strong>Meal Type:</strong> {recipe.mealType && recipe.mealType.join(', ')}</p>
            <p><strong>Tags:</strong> {recipe.tags && recipe.tags.join(', ')}</p>
            <p><strong>Rating:</strong> {recipe.rating} ({recipe.reviewCount} reviews)</p>
            <div>
                <strong>Ingredients:</strong>
                <ul>
                    {recipe.ingredients && recipe.ingredients.map((ingredient, idx) => (
                        <li key={idx}>{ingredient}</li>
                    ))}
                </ul>
            </div>
            <div>
                <strong>Instructions:</strong>
                <ol>
                    {recipe.instructions && recipe.instructions.map((step, idx) => (
                        <li key={idx}>{step}</li>
                    ))}
                </ol>
            </div>
        </div>
    )
}

export default RecipeCard;