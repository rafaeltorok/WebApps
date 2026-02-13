import { useState, useEffect } from "react";
import gpuService from "./services/gpus";
import GpuContext from "./GpuContext";

import GpuList from "./components/GpuList";
import AddGpuForm from "./components/AddGpuForm";
import PageIndex from "./components/PageIndex";
import SearchBar from "./components/SearchBar";

import "./styles/App.css";

function App() {
  const [gpus, setGpus] = useState([]);
  const [showAll, setShowAll] = useState(false); // Controls the visibility of all tables
  const [searchGpu, setSearchGpu] = useState("");
  const [gpusFound, setGpusFound] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false); // Controls the visibility of the Add GPU form

  useEffect(() => {
    async function getData() {
      try {
        const data = await gpuService.getAll();
        setGpus(data);
      } catch (err) {
        console.error("Failed to fetch GPUs data:", err);
      }
    }
    getData();
  }, []);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchGpu) {
        const filteredGpus = gpus.filter((g) =>
          (
            g.manufacturer.toLowerCase() +
            g.gpuline.toLowerCase() +
            g.model.toLowerCase()
          ).includes(searchGpu.toLowerCase()),
        );
        setGpusFound(filteredGpus);
      } else {
        setGpusFound([]);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [searchGpu, gpus]);

  async function createGpu(newGpu) {
    try {
      const gpu = await gpuService.create(newGpu);
      setGpus([...gpus, gpu]);
      console.log("GPU Specs Submitted:", gpu);
      alert(`${gpu.manufacturer} ${gpu.gpuline} ${gpu.model} was added!`);
    } catch (err) {
      console.error("Error adding new GPU:", err);
    }

    // Confirms the GPU was added, so the AddGpuForm component can clear the form data
    return true;
  }

  const deleteGpu = (id, manufacturer, gpuline, model) => {
    const confirmDeletion = window.confirm(
      `Remove ${manufacturer} ${gpuline} ${model} from the list?`,
    );

    if (confirmDeletion) {
      gpuService
        .remove(id)
        .then(() => {
          // Remove the GPU from the state
          setGpus(gpus.filter((gpu) => gpu.id !== id));
        })
        .catch((error) => {
          console.error("Error deleting GPU:", error);
        });
    }
  };

  function scrollToIndex(gpuTableId) {
    const element = document.getElementById("add-gpu-form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });

      const gpuTable = document.getElementById(gpuTableId);
      const hideButton = gpuTable.querySelector(".show-hide-button");
      const showAllButton = document.getElementById("show-all-button");

      if (
        hideButton &&
        hideButton.textContent === "Hide" &&
        showAllButton.textContent === "Show all data"
      ) {
        hideButton.click();
      }
    }
  }

  return (
    <GpuContext.Provider
      value={{
        gpus,
        setGpus,
        showAll,
        setShowAll,
        searchGpu,
        setSearchGpu,
        gpusFound,
        setGpusFound,
        showAddForm,
        setShowAddForm,
        scrollToIndex,
        createGpu,
        deleteGpu,
      }}
    >
      <div>
        <h1 id="main-page-title">GPU List</h1>
        <AddGpuForm />
        <SearchBar />
        <PageIndex />
        <div id="show-all-button" className="button-area">
          <button onClick={() => setShowAll((prev) => !prev)}>
            {showAll ? "Hide all data" : "Show all data"}
          </button>
        </div>
        <GpuList />
      </div>
    </GpuContext.Provider>
  );
}

export default App;
