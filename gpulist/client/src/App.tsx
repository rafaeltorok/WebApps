// Client base dependencies
import { useEffect, useReducer } from "react";
import gpuService from "./services/gpus.js";
import GpuContext from "./GpuContext.js";
import gpuDataReducer from './reducers/gpuDataReducer.js';
import gpuUiReducer from "./reducers/gpuUiReducer.js";

// Components
import GpuList from "./components/GpuList.js";
import AddGpuForm from "./components/AddGpuForm.js";
import PageIndex from "./components/PageIndex.js";
import SearchBar from "./components/SearchBar.js";

// CSS Styles
import "./styles/App.css";
import type { GpuType, GpuInputType } from "./types.js";

function App() {
  const [dataState, dataDispatch] = useReducer(gpuDataReducer, {
    gpus: [],
    gpusFound: [],
    loading: false,
    error: false,
  });

  const [uiState, uiDispatch] = useReducer(gpuUiReducer, {
    searchGpu: "",
    showAll: false,
    showAddForm: false,
    showSearch: false,
    showIndex: false,
  });

  useEffect(() => {
    async function getData() {
      try {
        dataDispatch({ type: "FETCH_LOADING", payload: true }); // Sets loading data message on screen
        const data = await gpuService.getAll();
        dataDispatch({ type: "SET_GPUS", payload: data });
        dataDispatch({ type: "FETCH_LOADING", payload: false }); // After data is retrieved, remove the loading message
      } catch (err) {
        dataDispatch({ type: "FETCH_ERROR", payload: true });
        dataDispatch({ type: "FETCH_LOADING", payload: false });
        console.error("Failed to fetch GPUs data:", err);
      }
    }
    getData();
  }, []);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      if (uiState.searchGpu) {
        const filteredGpus = dataState.gpus.filter((g) =>
          (
            g.manufacturer.toLowerCase() +
            g.gpuline.toLowerCase() +
            g.model.toLowerCase()
          ).includes(uiState.searchGpu.toLowerCase()),
        );
        dataDispatch({
          type: "SET_FOUND",
          payload: filteredGpus,
        });
      } else {
        dataDispatch({
          type: "SET_FOUND",
          payload: [],
        });
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [uiState.searchGpu, dataState.gpus]);

  async function createGpu(newGpu: GpuInputType): Promise<boolean> {
    try {
      const gpu: GpuType = await gpuService.create(newGpu);
      dataDispatch({
        type: "ADD_GPU",
        payload: gpu,
      });
      console.log("GPU Specs Submitted:", gpu);
      alert(`${gpu.manufacturer} ${gpu.gpuline} ${gpu.model} was added!`);
    } catch (err) {
      console.error("Error adding new GPU:", err);
    }

    // Confirms the GPU was added, so the AddGpuForm component can clear the form data
    return true;
  }

  async function deleteGpu(
    id: string, 
    manufacturer: string, 
    gpuline: string, 
    model: string
  ): Promise<void> {
    const confirmDeletion: boolean = window.confirm(
      `Remove ${manufacturer} ${gpuline} ${model} from the list?`,
    );

    if (confirmDeletion) {
      try {
        await gpuService.remove(id);
        dataDispatch({
          type: "SET_GPUS",
          payload: dataState.gpus.filter((gpu: GpuType) => gpu.id !== id),
        });
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("Error deleting GPU:", err);
        }
      }
    }
  }

  if (dataState.loading) return <h2>Loading GPU data, please wait...</h2>;

  if (dataState.error) return <h2>Failed to retrieve GPU data</h2>;

  return (
    <GpuContext.Provider
      value={{
        createGpu,
        deleteGpu,
        dataState,
        dataDispatch,
        uiState,
        uiDispatch
      }}
    >
      <div>
        <h1 id="main-page-title">GPU List</h1>
        <AddGpuForm />
        <SearchBar />
        <PageIndex />
        <div id="show-all-button" className="button-area">
          <button
            onClick={() =>
              uiDispatch({
                type: "TOGGLE_SHOW_ALL",
              })
            }
          >
            {uiState.showAll ? "Hide all data" : "Show all data"}
          </button>
        </div>
        <GpuList />
      </div>
    </GpuContext.Provider>
  );
}

export default App;
