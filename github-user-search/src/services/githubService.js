import axios from 'axios';

const GITHUB_API_BASE_URL = 'https://api.github.com';

/**
 * Fetch user data from GitHub API
 * @param {string} username - GitHub username to search for
 * @returns {Promise<Object>} User data from GitHub
 */
export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${GITHUB_API_BASE_URL}/users/${username}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error('User not found');
    }
    throw new Error('Failed to fetch user data');
  }
};

/**
 * Advanced search for GitHub users
 * @param {Object} params - Search parameters
 * @param {string} params.username - Username to search
 * @param {string} params.location - User location
 * @param {number} params.minRepos - Minimum number of repositories
 * @param {number} params.page - Page number for pagination (default: 1)
 * @returns {Promise<Object>} Search results from GitHub
 */
export const searchUsers = async ({ username, location, minRepos, page = 1 }) => {
  try {
    // Build query string based on provided parameters
    let query = [];
    
    if (username) {
      query.push(username);
    }
    
    if (location) {
      query.push(`location:${location}`);
    }
    
    if (minRepos) {
      query.push(`repos:>=${minRepos}`);
    }
    
    // Join query parts with space
    const queryString = query.join(' ');
    
    // Make API request with pagination
    const response = await axios.get(
      `${GITHUB_API_BASE_URL}/search/users`,
      {
        params: {
          q: queryString,
          page: page,
          per_page: 10 // Results per page
        }
      }
    );
    
    return response.data;
  } catch (error) {
    throw new Error('Failed to search users');
  }
};