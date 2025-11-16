import { Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';
import FavoriteButton from './FavoriteButton';

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const searchTerm = useRecipeStore((state) => state.searchTerm);

  const list = searchTerm.trim()
    ? recipes.filter((r) =>
        r.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : recipes;

  return (
    <div>
      {list.map((recipe) => (
        <div key={recipe.id}>
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
