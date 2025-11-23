import { useState } from 'react';
import { searchUsers, fetchUserData } from '../services/githubService';

const Search = () => {
  // Form state
  const [formData, setFormData] = useState({
    username: '',
    location: '',
    minRepos: ''
  });
  
  // Results state
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCurrentPage(1);
    await performSearch(1);
  };

  const performSearch = async (page) => {
    if (!formData.username && !formData.location && !formData.minRepos) {
      return;
    }

    setLoading(true);
    setError(false);

    try {
      const data = await searchUsers({
        username: formData.username,
        location: formData.location,
        minRepos: formData.minRepos,
        page: page
      });
      
      if (page === 1) {
        setUsers(data.items);
      } else {
        setUsers(prev => [...prev, ...data.items]);
      }
      
      setTotalCount(data.total_count);
      setHasMore(data.items.length === 10);
      
    } catch (err) {
      setError(true);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    performSearch(nextPage);
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Advanced Search Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Advanced Search
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Input */}
          <div>
            <label 
              htmlFor="username" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Enter GitHub username"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>

          {/* Location Input */}
          <div>
            <label 
              htmlFor="location" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="e.g., Morocco, USA, London"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>

          {/* Min Repos Input */}
          <div>
            <label 
              htmlFor="minRepos" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Minimum Repositories
            </label>
            <input
              type="number"
              id="minRepos"
              name="minRepos"
              value={formData.minRepos}
              onChange={handleInputChange}
              placeholder="e.g., 10"
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>

      {/* Results Count */}
      {totalCount > 0 && !loading && (
        <div className="mb-4">
          <p className="text-white text-lg">
            Found <span className="font-bold">{totalCount}</span> users
          </p>
        </div>
      )}

      {/* Loading State */}
      {loading && currentPage === 1 && (
        <div className="text-center py-12">
          <div className="inline-block w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white mt-4 text-lg">Loading...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-100 border-2 border-red-400 rounded-lg p-6 text-center">
          <p className="text-red-700 font-semibold text-lg">
            Looks like we cant find the user
          </p>
        </div>
      )}

      {/* Results Grid */}
      {users.length > 0 && !error && (
        <div className="space-y-4">
          {users.map(user => (
            <div 
              key={user.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition"
            >
              <div className="flex items-start gap-4">
                <img
                  src={user.avatar_url}
                  alt={user.login}
                  className="w-20 h-20 rounded-full border-2 border-gray-200"
                />
                
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    {user.login}
                  </h3>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                    {user.location && (
                      <span className="flex items-center gap-1">
                        📍 {user.location}
                      </span>
                    )}
                  </div>
                  
                  
                    <a href={user.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                  >
                    View Profile →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Load More Button */}
      {hasMore && !loading && users.length > 0 && (
        <div className="text-center mt-8">
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-8 rounded-lg transition disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}

      {/* Empty State */}
      {users.length === 0 && !loading && !error && (
        <div className="text-center py-12 text-white">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-lg">
            Enter search criteria to find GitHub users
          </p>
        </div>
      )}
    </div>
  );
};

export default Search;