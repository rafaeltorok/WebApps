import type { DataState, DataActions } from "../types/gpu";

const dataReducer = (state: DataState, action: DataActions): DataState => {
  switch (action.type) {
    case "FETCH_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "SET_GPUS":
      return {
        ...state,
        gpus: action.payload,
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
    default:
      throw new Error("Invalid action");
  }
};

export default dataReducer;
