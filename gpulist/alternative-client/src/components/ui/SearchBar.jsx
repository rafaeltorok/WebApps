import PropTypes from 'prop-types'
import '../../styles/SearchBar.css'

function SearchBar({ onSearch, searchTerm }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search GPUs..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
      />
      {searchTerm && (
        <button 
          className="clear-search"
          onClick={() => onSearch('')}
        >
          ×
        </button>
      )}
    </div>
  )
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired
}

export default SearchBar