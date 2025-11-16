import { create } from 'zustand';

export const useRecipeStore = create((set) => ({
  recipes: [],

  addRecipe: (newRecipe) =>
    set((state) => ({
      recipes: [...state.recipes, newRecipe],
    })),

  deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter((recipe) => recipe.id !== id),
    })),

  updateRecipe: (updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map((recipe) =>
        recipe.id === updatedRecipe.id ? { ...recipe, ...updatedRecipe } : recipe
      ),
    })),

  searchTerm: '',
  setSearchTerm: (term) => set({ searchTerm: term }),

  favorites: [],

  addFavorite: (recipeId) =>
    set((state) => {
      if (state.favorites.includes(recipeId)) return state; 
      return { favorites: [...state.favorites, recipeId] };
    }),

  removeFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== recipeId),
    })),

  recommendations: [],

  generateRecommendations: () =>
    set((state) => {
      if (state.recipes.length === 0) {
        return { recommendations: [] };
      }

      const recommended = state.recipes.filter(() => Math.random() > 0.5);

      return { recommendations: recommended };
    }),
}));
