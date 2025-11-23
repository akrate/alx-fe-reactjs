import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import SearchBar from './components/SearchBar';
import UserCard from './components/UserCard';
import { searchGitHubUsers } from './services/githubApi';
import './styles/App.css';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (username) => {
    setLoading(true);
    setError(null);
    setUser(null);

    try {
      const userData = await searchGitHubUsers(username);
      setUser(userData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <div className="header-title">
            <FaUser size={48} className="header-icon" />
            <h1>GitHub User Search</h1>
          </div>
          <p className="header-subtitle">
            Search for GitHub users and view their profiles
          </p>
        </header>

        <SearchBar onSearch={handleSearch} loading={loading} />

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Searching...</p>
          </div>
        )}

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        {user && !loading && <UserCard user={user} />}

        {!user && !loading && !error && (
          <div className="empty-state">
            <FaUser size={64} className="empty-icon" />
            <p>Enter a GitHub username to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}