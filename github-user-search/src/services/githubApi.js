// GitHub API Service
export const searchGitHubUsers = async (username) => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'User not found');
    }
    
    return await response.json();
  } catch (error) {
    throw new Error(error.message || 'User not found');
  }
};