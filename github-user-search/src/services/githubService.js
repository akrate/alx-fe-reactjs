import axios from 'axios';

const GITHUB_API_BASE_URL = 'https://api.github.com';

/**
 * Fetch user data from GitHub API
 */
export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${GITHUB_API_BASE_URL}/users/${username}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error('User not found');
    }
    if (error.response && error.response.status === 403) {
      throw new Error('API rate limit exceeded. Please try again later.');
    }
    throw new Error('Failed to fetch user data');
  }
};

/**
 * Advanced search for GitHub users
 * Uses GitHub Search API: https://api.github.com/search/users?q
 */
export const searchUsers = async ({ username, location, minRepos, page = 1 }) => {
  try {
    // Build query string
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
    
    // Validate query
    if (query.length === 0) {
      throw new Error('Please provide at least one search criteria');
    }
    
    const queryString = query.join(' ');
    
    // Make request to: https://api.github.com/search/users?q={query}
    const response = await axios.get(
      'https://api.github.com/search/users?q',
      {
        params: {
          q: queryString,
          page: page,
          per_page: 10
        }
      }
    );
    
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      throw new Error('API rate limit exceeded. Please try again later.');
    }
    throw new Error(error.message || 'Failed to search users');
  }
};