import { useRecipeStore } from '../recipeStore';

const FavoritesList = () => {
  const favoritesRecipes = useRecipeStore((state) =>
    state.favorites
      .map((id) => state.recipes.find((recipe) => recipe.id === id))
      .filter(Boolean)
  );

  if (favoritesRecipes.length === 0) {
    return (
      <div>
        <h2>My Favorites</h2>
        <p>You have no favorite recipes yet.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>My Favorites</h2>
      {favoritesRecipes.map((recipe) => (
        <div key={recipe.id} style={{ marginBottom: '1rem' }}>
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
        </div>
      ))}
    </div>
  );
};

export default FavoritesList;
