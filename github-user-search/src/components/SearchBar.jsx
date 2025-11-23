import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

export default function SearchBar({ onSearch, loading }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = () => {
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="search-container">
      <div className="search-box">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search GitHub username..."
          disabled={loading}
          className="search-input"
        />
        <button
          onClick={handleSubmit}
          disabled={loading || !searchTerm.trim()}
          className="search-button"
        >
          <FaSearch size={20} />
        </button>
      </div>
    </div>
  );
}