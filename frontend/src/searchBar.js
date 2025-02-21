import React, { useState } from 'react';
import './searchBar.css';

export default function SearchBar({ searchTerm, setSearchTerm, onSearch }) {
  const [query, setQuery] = useState(searchTerm);

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);  // Pass the query to the parent component's search handler
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>
        <i className="fas fa-search"></i>
      </button>
    </div>
  );
}
