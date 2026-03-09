import type { GpuType } from "../types";

type State = {
  gpus: GpuType[];
  loading: boolean;
  error: boolean;
  gpusFound: GpuType[];
};

type Action = 
  | { type: "FETCH_LOADING", payload: boolean }
  | { type: "FETCH_ERROR", payload: boolean }
  | { type: "SET_GPUS", payload: GpuType[] }
  | { type: "SET_FOUND", payload: GpuType[] }
  | { type: "ADD_GPU", payload: GpuType };

const gpuDataReducer = (state: State, action: Action): State => {
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

export default gpuDataReducer;
