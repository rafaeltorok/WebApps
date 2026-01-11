import { useState, useEffect } from "react";
import Gpu from "./components/Gpu";
import AddGpuForm from "./components/AddGpuForm";
import PageIndex from "./components/PageIndex";
import SearchBar from "./components/SearchBar";
import gpuService from "./services/gpus";
import "./styles/App.css";

function App() {
  const [gpus, setGpus] = useState([]);
  const [showAll, setShowAll] = useState(false); // Controls the visibility of all tables
  const [searchGpu, setSearchGpu] = useState("");
  const [gpusFound, setGpusFound] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false); // Controls the visibility of the Add GPU form

  useEffect(() => {
    gpuService.getAll().then((initialGpuList) => {
      setGpus(initialGpuList);
    });
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

  const handleSearchGpu = (event) => {
    setSearchGpu(event.target.value);
  };

  const addGpu = (gpu) => {
    if (
      gpu.manufacturer.trim() === "" ||
      gpu.model.trim() === "" ||
      Number(gpu.cores.trim()) < 1 ||
      Number(gpu.tmus.trim()) < 1 ||
      Number(gpu.rops.trim()) < 1 ||
      Number(gpu.vram.trim()) < 0.016 ||
      Number(gpu.bus.trim()) < 1 ||
      gpu.memtype.trim() === "" ||
      Number(gpu.baseclock.trim()) < 1 ||
      Number(gpu.boostclock.trim()) < 1 ||
      Number(gpu.memclock.trim()) < 0.1
    ) {
      alert("Invalid GPU data");
      return false;
    }

    gpuService
      .create({
        manufacturer: gpu.manufacturer.trim(),
        gpuline: gpu.gpuline.trim(),
        model: gpu.model.trim(),
        cores: gpu.cores === "" ? null : Number(gpu.cores.trim()),
        tmus: gpu.tmus === "" ? null : Number(gpu.tmus.trim()),
        rops: gpu.rops === "" ? null : Number(gpu.rops.trim()),
        vram: gpu.vram === "" ? null : Number(gpu.vram.trim()),
        bus: gpu.bus === "" ? null : Number(gpu.bus.trim()),
        memtype: gpu.memtype.trim(),
        baseclock: gpu.baseclock === "" ? null : Number(gpu.baseclock.trim()),
        boostclock:
          gpu.boostclock === "" ? null : Number(gpu.boostclock.trim()),
        memclock: gpu.memclock === "" ? null : Number(gpu.memclock.trim()),
      })
      .then((returnedObject) => {
        setGpus((prevGpus) => [...prevGpus, returnedObject]); // Functional update for state
        console.log("GPU Specs Submitted:", returnedObject);
        alert(
          `${returnedObject.manufacturer} ${returnedObject.gpuline} ${returnedObject.model} was added!`,
        );
        setShowAddForm(false);
      })
      .catch((exception) => {
        alert("Failed to add new GPU");
        console.error("Error adding new GPU:", exception);
      });

    // Confirms the GPU was added, so the AddGpuForm component can clear the form data
    return true;
  };

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

  // Helper to render GPU list and index
  const renderGpuList = (gpuList) => (
    <>
      <PageIndex gpusData={gpuList} />
      <div id="show-all-button" className="button-area">
        <button onClick={() => setShowAll((prev) => !prev)}>
          {showAll ? "Hide all data" : "Show all data"}
        </button>
      </div>
      {gpuList.map((gpu) => (
        <div key={gpu.id}>
          <Gpu
            gpu={gpu}
            onDelete={deleteGpu}
            showAll={showAll}
            id={`${gpu.manufacturer.toLowerCase()}-${gpu.gpuline.toLowerCase()}-${gpu.model.toLowerCase()}`}
          />
          <button
            className="back-to-index-button"
            onClick={() =>
              scrollToIndex(
                `${gpu.manufacturer.toLowerCase()}-${gpu.gpuline.toLowerCase()}-${gpu.model.toLowerCase()}`,
              )
            }
          >
            Back to Index
          </button>
        </div>
      ))}
    </>
  );

  return (
    <>
      <div>
        <h1 id="main-page-title">GPU List</h1>
        <AddGpuForm
          createGpu={addGpu}
          showAddForm={showAddForm}
          setShowAddForm={setShowAddForm}
        />
        <SearchBar
          handleSearchGpu={handleSearchGpu}
          searchGpu={searchGpu}
          setSearchGpu={setSearchGpu}
        />
        {searchGpu ? (
          gpusFound.length > 0 ? (
            renderGpuList(gpusFound)
          ) : (
            <div>No GPUs found</div>
          )
        ) : (
          renderGpuList(gpus)
        )}
      </div>
    </>
  );
}

export default App;
