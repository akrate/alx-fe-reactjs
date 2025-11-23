import axios from 'axios';

const GITHUB_API_BASE_URL = 'https://api.github.com';

/**
 * Fetch user data from GitHub API using Axios
 * @param {string} username - GitHub username to search for
 * @returns {Promise<Object>} User data from GitHub
 */
export const fetchUserData = async (username) => {
  try {
    // Make API request using axios.get
    const response = await axios.get(`${GITHUB_API_BASE_URL}/users/${username}`);
    
    // Return the data from response
    return response.data;
    
  } catch (error) {
    // Handle errors
    if (error.response && error.response.status === 404) {
      throw new Error('User not found');
    }
    throw new Error('Failed to fetch user data');
  }
};