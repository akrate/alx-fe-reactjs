import { Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

const RecipeList = () => {
  const { recipes, filteredRecipes, searchTerm } = useRecipeStore((state) => ({
    recipes: state.recipes,
    filteredRecipes: state.filteredRecipes,
    searchTerm: state.searchTerm,
  }));

  const listToShow =
    searchTerm.trim() === '' ? recipes : filteredRecipes;

  if (!listToShow || listToShow.length === 0) {
    return <p>No recipes found.</p>;
  }

  return (
    <div>
      {listToShow.map((recipe) => (
        <div key={recipe.id}>
          <h3>
            <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
          </h3>
          <p>{recipe.description}</p>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
