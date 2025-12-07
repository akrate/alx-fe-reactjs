import React, { useState } from "react";

const AddRecipeForm = () => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [errors, setErrors] = useState("");

  // 🔥 Validation function
  const validate = () => {
    if (!title || !ingredients || !steps) {
      return "All fields are required.";
    }

    const ingredientsList = ingredients
      .split("\n")
      .map((i) => i.trim())
      .filter((i) => i !== "");

    if (ingredientsList.length < 2) {
      return "Ingredients must include at least two items.";
    }

    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errorMessage = validate();
    if (errorMessage) {
      setErrors(errorMessage);
      return;
    }

    const newRecipe = {
      title,
      ingredients: ingredients.split("\n"),
      steps: steps.split("\n"),
    };

    console.log("Submitted Recipe:", newRecipe);

    setTitle("");
    setIngredients("");
    setSteps("");
    setErrors("");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 md:p-8 w-full max-w-lg md:max-w-xl"
      >
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center">
          Add New Recipe
        </h1>

        {errors && (
          <p className="bg-red-100 text-red-700 p-2 mb-4 rounded">{errors}</p>
        )}

        {/* Title */}
        <label className="block mb-1 font-semibold">Recipe Title</label>
        <input
          type="text"
          className="w-full border rounded p-2 mb-4 md:mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter recipe title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Ingredients */}
        <label className="block mb-1 font-semibold">
          Ingredients (one per line)
        </label>
        <textarea
          className="w-full border rounded p-2 mb-4 md:mb-6 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={"e.g.\nSugar\nMilk\nEggs"}
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        ></textarea>

        {/* Steps */}
        <label className="block mb-1 font-semibold">Preparation Steps</label>
        <textarea
          className="w-full border rounded p-2 mb-4 md:mb-6 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={"e.g.\nMix ingredients\nBake for 20 minutes"}
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
        ></textarea>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 md:py-3 rounded hover:bg-blue-700 transition"
        >
          Submit Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipeForm;
