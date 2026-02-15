const gpuReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_LOADING":
      return {
        ...state,
        onLoading: action.payload,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        onError: action.payload,
      };
    case "SET_GPUS":
      return {
        ...state,
        gpus: action.payload,
      };
    case "SET_SEARCH":
      return {
        ...state,
        searchGpu: action.payload,
      };
    case "SET_FOUND":
      return {
        ...state,
        gpusFound: action.payload,
      };
    case "ADD_GPU":
      return {
        ...state,
        gpus: [...state.gpus, action.payload],
      };
    case "TOGGLE_SEARCH":
      return {
        ...state,
        showSearch: !state.showSearch,
      };
    case "TOGGLE_SHOW_ALL":
      return {
        ...state,
        showAll: !state.showAll,
      };
    case "TOGGLE_ADD_FORM":
      return {
        ...state,
        showAddForm: !state.showAddForm,
      };
    case "TOGGLE_INDEX":
      return {
        ...state,
        showIndex: !state.showIndex,
      };
    default:
      throw new Error("Invalid action");
  }
};

export default gpuReducer;
