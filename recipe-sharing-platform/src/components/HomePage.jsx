import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);

  // تحميل البيانات من ملف data.json
  useEffect(() => {
    fetch("/src/data.json")
      .then((response) => response.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.error("Error loading data:", error));
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* عنوان الصفحة */}
      <h1 className="text-3xl font-bold mb-6 text-center">Recipes</h1>

      {/* Grid Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">

        {/* Cards */}
        {recipes.map((recipe) => (
          <Link to={`/recipe/${recipe.id}`} key={recipe.id}>
            <div
              className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
            >
              {/* الصورة */}
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-40 object-cover"
              />

              {/* المحتوى */}
              <div className="p-4">
                <h2 className="text-xl font-semibold">{recipe.title}</h2>
                <p className="text-gray-600 mt-2">{recipe.summary}</p>
              </div>
            </div>
          </Link>
        ))}

      </div>
    </div>
  );
};

export default HomePage;
