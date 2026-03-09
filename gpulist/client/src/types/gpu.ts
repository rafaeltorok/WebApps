export type GpuInputType = {
  manufacturer: string;
  gpuline: string;
  model: string;
  cores: number;
  tmus: number;
  rops: number;
  vram: number;
  bus: number;
  memtype: string;
  baseclock: number;
  boostclock: number;
  memclock: number;
};

export type GpuType = {
  id: string;
  manufacturer: string;
  gpuline: string;
  model: string;
  cores: number;
  tmus: number;
  rops: number;
  vram: number;
  bus: number;
  memtype: string;
  baseclock: number;
  boostclock: number;
  memclock: number;
};

// React Context types
export type UiState = {
  searchGpu: string;
  showSearch: boolean;
  showAll: boolean;
  showAddForm: boolean;
  showIndex: boolean;
};

export type UiActions =
  | { type: "SET_SEARCH"; payload: string }
  | { type: "TOGGLE_SEARCH" }
  | { type: "TOGGLE_SHOW_ALL" }
  | { type: "TOGGLE_ADD_FORM" }
  | { type: "TOGGLE_INDEX" };

export type DataState = {
  gpus: GpuType[];
  loading: boolean;
  error: boolean;
  gpusFound: GpuType[];
};

export type DataActions =
  | { type: "FETCH_LOADING"; payload: boolean }
  | { type: "FETCH_ERROR"; payload: boolean }
  | { type: "SET_GPUS"; payload: GpuType[] }
  | { type: "SET_FOUND"; payload: GpuType[] }
  | { type: "ADD_GPU"; payload: GpuType };

export type GpuContextType = {
  createGpu: (gpu: GpuInputType) => Promise<boolean>;
  deleteGpu: (gpu: GpuType) => Promise<void>;
  dataState: DataState;
  dataDispatch: React.Dispatch<DataActions>;
  uiState: UiState;
  uiDispatch: React.Dispatch<UiActions>;
};
