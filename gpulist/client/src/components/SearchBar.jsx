import { useEffect, useContext } from "react";
import GpuContext from "../GpuContext";

import "../styles/SearchBar.css";

export default function SearchBar() {
  const {
    state: { showSearch, searchGpu },
    dispatch,
  } = useContext(GpuContext);

  const handleSearch = (event) => {
    dispatch({
      type: "SET_SEARCH",
      payload: event.target.value,
    });
  };

  useEffect(() => {
    if (!showSearch) {
      dispatch({
        type: "SET_SEARCH",
        payload: "",
      });
    }
  }, [showSearch, dispatch]);

  return (
    <div id="search-bar-field">
      <button
        id="show-search-button"
        type="button"
        onClick={() =>
          dispatch({
            type: "TOGGLE_SEARCH",
          })
        }
      >
        {showSearch ? "Cancel" : "Search"}
      </button>
      {showSearch && (
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
