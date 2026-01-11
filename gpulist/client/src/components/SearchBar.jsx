import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../styles/SearchBar.css";

export default function SearchBar({
  handleSearchGpu,
  searchGpu,
  setSearchGpu,
}) {
  const [showSearchBar, setShowSearchBar] = useState(false);

  useEffect(() => {
    if (!showSearchBar) {
      setSearchGpu("");
      handleSearchGpu({ target: { value: "" } });
    }
  }, [showSearchBar]);

  return (
    <div id="search-bar-field">
      <button
        id="show-search-button"
        type="button"
        onClick={() => setShowSearchBar((prev) => !prev)}
      >
        {showSearchBar ? "Cancel" : "Search"}
      </button>
      {showSearchBar && (
        <form>
          <input
            type="text"
            id="search-bar-input"
            placeholder="Search"
            value={searchGpu}
            onChange={handleSearchGpu}
          />
        </form>
      )}
    </div>
  );
}

SearchBar.displayName = "SearchBar";

SearchBar.propTypes = {
  handleSearchGpu: PropTypes.func.isRequired,
  searchGpu: PropTypes.string.isRequired,
  setSearchGpu: PropTypes.func.isRequired,
};
