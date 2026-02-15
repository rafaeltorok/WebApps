import { useEffect, useReducer } from "react";
import gpuService from "./services/gpus";
import GpuContext from "./GpuContext";
import gpuReducer from "./reducers/gpuReducer";

import GpuList from "./components/GpuList";
import AddGpuForm from "./components/AddGpuForm";
import PageIndex from "./components/PageIndex";
import SearchBar from "./components/SearchBar";

import "./styles/App.css";

function App() {
  const [state, dispatch] = useReducer(gpuReducer, {
    gpus: [],
    searchGpu: "",
    gpusFound: [],
    showAll: false,
    showAddForm: false,
    showSearch: false,
    showIndex: false,
    onLoading: false,
    onError: false,
  });

  useEffect(() => {
    async function getData() {
      try {
        dispatch({ type: "FETCH_LOADING", payload: true }); // Sets loading data message on screen
        const data = await gpuService.getAll();
        dispatch({ type: "SET_GPUS", payload: data });
        dispatch({ type: "FETCH_LOADING", payload: false }); // After data is retrieved, remove the loading message
      } catch (err) {
        dispatch({ type: "FETCH_ERROR", payload: true });
        dispatch({ type: "FETCH_LOADING", payload: false });
        console.error("Failed to fetch GPUs data:", err);
      }
    }
    getData();
  }, []);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      if (state.searchGpu) {
        const filteredGpus = state.gpus.filter((g) =>
          (
            g.manufacturer.toLowerCase() +
            g.gpuline.toLowerCase() +
            g.model.toLowerCase()
          ).includes(state.searchGpu.toLowerCase()),
        );
        dispatch({
          type: "SET_FOUND",
          payload: filteredGpus,
        });
      } else {
        dispatch({
          type: "SET_FOUND",
          payload: [],
        });
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [state.searchGpu, state.gpus]);

  async function createGpu(newGpu) {
    try {
      const gpu = await gpuService.create(newGpu);
      dispatch({
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

  async function deleteGpu(id, manufacturer, gpuline, model) {
    const confirmDeletion = window.confirm(
      `Remove ${manufacturer} ${gpuline} ${model} from the list?`,
    );

    if (confirmDeletion) {
      try {
        await gpuService.remove(id);
        dispatch({
          type: "SET_GPUS",
          payload: state.gpus.filter((gpu) => gpu.id !== id),
        });
      } catch (err) {
        console.error("Error deleting GPU:", err);
      }
    }
  }

  if (state.onLoading) return <h2>Loading GPU data, please wait...</h2>;

  if (state.onError) return <h2>Failed to retrieve GPU data</h2>;

  return (
    <GpuContext.Provider
      value={{
        createGpu,
        deleteGpu,
        state,
        dispatch,
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
              dispatch({
                type: "TOGGLE_SHOW_ALL",
              })
            }
          >
            {state.showAll ? "Hide all data" : "Show all data"}
          </button>
        </div>
        <GpuList />
      </div>
    </GpuContext.Provider>
  );
}

export default App;
