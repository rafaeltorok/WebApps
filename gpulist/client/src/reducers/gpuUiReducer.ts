type State = {
  searchGpu: string;
  showSearch: boolean;
  showAll: boolean;
  showAddForm: boolean;
  showIndex: boolean;
};

type Action = 
  | { type: "SET_SEARCH", payload: string }
  | { type: "TOGGLE_SEARCH" }
  | { type: "TOGGLE_SHOW_ALL" }
  | { type: "TOGGLE_ADD_FORM" }
  | { type: "TOGGLE_INDEX" };

const gpuUiReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_SEARCH":
      return {
        ...state,
        searchGpu: action.payload,
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

export default gpuUiReducer;