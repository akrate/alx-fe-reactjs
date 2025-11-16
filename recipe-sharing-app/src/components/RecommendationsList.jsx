import { useRecipeStore } from '../recipeStore';

const RecommendationsList = () => {
  const { recommendations, generateRecommendations } = useRecipeStore((state) => ({
    recommendations: state.recommendations,
    generateRecommendations: state.generateRecommendations,
  }));

  const handleRefresh = () => {
    generateRecommendations(); 
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>Recommended Recipes</h2>
      <button onClick={handleRefresh} style={{ marginBottom: '1rem' }}>
        Refresh recommendations
      </button>

      {recommendations.length === 0 ? (
        <p>No recommendations yet. Try adding more recipes or clicking refresh.</p>
      ) : (
        recommendations.map((recipe) => (
          <div key={recipe.id} style={{ marginBottom: '1rem' }}>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default RecommendationsList;
