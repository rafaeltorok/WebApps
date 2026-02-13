import { useState, useEffect, useContext } from "react";
import GpuContext from "../GpuContext";

import "../styles/SearchBar.css";

export default function SearchBar() {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const { searchGpu, setSearchGpu } = useContext(GpuContext);

  const handleSearch = (event) => {
    setSearchGpu(event.target.value);
  };

  useEffect(() => {
    if (!showSearchBar) {
      setSearchGpu("");
    }
  }, [showSearchBar, setSearchGpu]);

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
            onChange={handleSearch}
          />
        </form>
      )}
    </div>
  );
}

SearchBar.displayName = "SearchBar";
