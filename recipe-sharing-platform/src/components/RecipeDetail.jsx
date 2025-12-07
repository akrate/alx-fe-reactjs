import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const RecipeDetail = () => {
  const { id } = useParams(); // الحصول على ID من URL
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch("/src/data.json")
      .then((response) => response.json())
      .then((data) => {
        const selectedRecipe = data.find((item) => item.id === parseInt(id));
        setRecipe(selectedRecipe);
      })
      .catch((error) => console.error("Error loading data:", error));
  }, [id]);

  if (!recipe) {
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">

        {/* Image */}
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-60 object-cover rounded-lg mb-4"
        />

        {/* Title */}
        <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>

        {/* Ingredients */}
        <h2 className="text-2xl font-semibold mt-6 mb-2">Ingredients</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          {recipe.ingredients?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        {/* Instructions */}
        <h2 className="text-2xl font-semibold mt-6 mb-2">Instructions</h2>
        <ol className="list-decimal list-inside text-gray-700 space-y-2">
          {recipe.instructions?.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>

        {/* Back Button */}
        <Link
          to="/"
          className="inline-block mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default RecipeDetail;
