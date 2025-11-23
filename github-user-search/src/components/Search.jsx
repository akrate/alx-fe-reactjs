import { useState } from 'react';
import { fetchUserData } from '../services/githubService';
import '../styles/Search.css';

const Search = () => {
  // State management
  const [username, setUsername] = useState('');        // Input value
  const [userData, setUserData] = useState(null);      // User data from API
  const [loading, setLoading] = useState(false);       // Loading state
  const [error, setError] = useState(false);           // Error state

  /**
   * Handle form submission
   * @param {Event} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    
    // Validate input
    if (!username.trim()) {
      return; // Don't search if input is empty
    }

    // Reset states
    setLoading(true);
    setError(false);
    setUserData(null);

    try {
      // Fetch user data from API
      const data = await fetchUserData(username);
      setUserData(data); // Store user data
    } catch (err) {
      // Handle error
      setError(true);
    } finally {
      // Always set loading to false when done
      setLoading(false);
    }
  };

  /**
   * Handle input change
   * @param {Event} e - Input change event
   */
  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  return (
    <div className="search-container">
      {/* Search Form */}
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={username}
          onChange={handleInputChange}
          placeholder="Enter GitHub username"
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {/* Conditional Rendering Based on State */}
      
      {/* Loading State */}
      {loading && (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="error-container">
          <p>Looks like we cant find the user</p>
        </div>
      )}

      {/* Success State - Display User Data */}
      {userData && !loading && !error && (
        <div className="user-result">
          <img 
            src={userData.avatar_url} 
            alt={userData.login}
            className="user-avatar"
          />
          <div className="user-info">
            <h2>{userData.name || userData.login}</h2>
            <p className="username">@{userData.login}</p>
            {userData.bio && <p className="bio">{userData.bio}</p>}
            <a 
              href={userData.html_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="profile-link"
            >
              View GitHub Profile
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;