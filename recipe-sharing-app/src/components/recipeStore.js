import { create } from 'zustand';

export const useRecipeStore = create((set) => ({
  recipes: [],

  addRecipe: (newRecipe) =>
    set((state) => {
      const newRecipes = [...state.recipes, newRecipe];

      const search = state.searchTerm.toLowerCase();
      const filtered =
        search.trim() === ''
          ? newRecipes
          : newRecipes.filter((recipe) =>
              recipe.title.toLowerCase().includes(search)
            );

      return {
        recipes: newRecipes,
        filteredRecipes: filtered,
      };
    }),

  deleteRecipe: (id) =>
    set((state) => {
      const newRecipes = state.recipes.filter((recipe) => recipe.id !== id);

      const search = state.searchTerm.toLowerCase();
      const filtered =
        search.trim() === ''
          ? newRecipes
          : newRecipes.filter((recipe) =>
              recipe.title.toLowerCase().includes(search)
            );

      return {
        recipes: newRecipes,
        filteredRecipes: filtered,
      };
    }),

  updateRecipe: (updatedRecipe) =>
    set((state) => {
      const newRecipes = state.recipes.map((recipe) =>
        recipe.id === updatedRecipe.id ? { ...recipe, ...updatedRecipe } : recipe
      );

      const search = state.searchTerm.toLowerCase();
      const filtered =
        search.trim() === ''
          ? newRecipes
          : newRecipes.filter((recipe) =>
              recipe.title.toLowerCase().includes(search)
            );

      return {
        recipes: newRecipes,
        filteredRecipes: filtered,
      };
    }),

  searchTerm: '',
  filteredRecipes: [],

  setSearchTerm: (term) =>
    set((state) => {
      const search = term.toLowerCase();

      const filtered =
        search.trim() === ''
          ? state.recipes
          : state.recipes.filter((recipe) =>
              recipe.title.toLowerCase().includes(search)
            );

      return {
        searchTerm: term,
        filteredRecipes: filtered,
      };
    }),
}));
