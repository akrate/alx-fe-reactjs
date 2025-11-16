import { useRecipeStore } from './recipeStore';

const FavoritesList = () => {
  const favoritesRecipes = useRecipeStore((state) =>
    state.favorites
      .map((id) => state.recipes.find((recipe) => recipe.id === id))
      .filter(Boolean)
  );

  return (
    <div>
      <h2>My Favorites</h2>
      {favoritesRecipes.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        favoritesRecipes.map((recipe) => (
          <div key={recipe.id}>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default FavoritesList;
