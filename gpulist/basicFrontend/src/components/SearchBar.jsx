import { useState, useEffect } from "react"
import PropTypes from "prop-types"


function SearchBar({ handleSearchGpu, searchGpu, setSearchGpu }) {
  const [showSearchBar, setShowSearchBar] = useState(false)

  useEffect(() => {
    if (!showSearchBar) {
      setSearchGpu('')
      handleSearchGpu({ target: {value: ''} })
    }
  }, [showSearchBar])

  return (
    <div id="find-gpu-field">
      <button
        id='show-find-button'
        type='button'
        onClick={() => setShowSearchBar((prev) => !prev)}
      >
        {showSearchBar ? "Cancel" : "Search"}
      </button>
      {showSearchBar &&
        <form>
          <input 
            type='text'
            id='find-input'
            placeholder="Search"
            value={searchGpu}
            onChange={handleSearchGpu} 
          />
        </form>
      }
    </div>
  )
}

SearchBar.displayName = "SearchBar"

SearchBar.propTypes = {
  handleSearchGpu: PropTypes.func.isRequired,
  searchGpu: PropTypes.string.isRequired,
  setSearchGpu: PropTypes.func.isRequired
}

export default SearchBar