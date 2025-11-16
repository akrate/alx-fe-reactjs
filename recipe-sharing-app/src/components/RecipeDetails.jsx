import { Link } from 'react-router-dom';
import { useRecipeStore } from '../recipeStore';
import FavoriteButton from './FavoriteButton';

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const searchTerm = useRecipeStore((state) => state.searchTerm);

  const normalizedSearch = searchTerm.trim().toLowerCase();

  const listToShow =
    normalizedSearch === ''
      ? recipes
      : recipes.filter((recipe) =>
          recipe.title.toLowerCase().includes(normalizedSearch)
        );

  if (!listToShow || listToShow.length === 0) {
    return <p>No recipes found.</p>;
  }

  return (
    <div>
      {listToShow.map((recipe) => (
        <div key={recipe.id} style={{ marginBottom: '1rem' }}>
          <h3>
            <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
            <FavoriteButton recipeId={recipe.id} />
          </h3>
          <p>{recipe.description}</p>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
