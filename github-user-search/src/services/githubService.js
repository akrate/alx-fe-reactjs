/**
 * GitHub API Service
 * Handles all API requests to GitHub
 */

const GITHUB_API_BASE_URL = 'https://api.github.com';

/**
 * Fetch user data from GitHub API
 * @param {string} username - GitHub username to search for
 * @returns {Promise<Object>} User data from GitHub
 */
export const fetchUserData = async (username) => {
  try {
    // Make API request to GitHub
    const response = await fetch(`${GITHUB_API_BASE_URL}/users/${username}`);
    
    // Check if the response is successful
    if (!response.ok) {
      // If user not found or other error
      if (response.status === 404) {
        throw new Error('User not found');
      }
      throw new Error('Failed to fetch user data');
    }
    
    // Parse and return the JSON data
    const data = await response.json();
    return data;
    
  } catch (error) {
    // Re-throw the error to be handled by the component
    throw error;
  }
};