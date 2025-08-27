import { useState, useEffect, useRef } from 'react';
import Gpu from './components/Gpu';
import AddGpuForm from './components/AddGpuForm';
import PageIndex from './components/PageIndex';
import SearchBar from './components/SearchBar';
import gpuService from './services/gpus';
import './styles/App.css';


function App() {
  const [gpus, setGpus] = useState([]);
  const [showAll, setShowAll] = useState(false); // Controls the visibility of all tables
  const [searchGpu, setSearchGpu] = useState('');
  const [gpusFound, setGpusFound] = useState([]);

  const gpuFormRef = useRef();

  useEffect(() => {
    gpuService
      .getAll()
      .then(initialGpuList => {
        setGpus(initialGpuList)
      });
  }, []);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchGpu) {
        const filteredGpus = (
          gpus.filter(
            g => (
              g.manufacturer.toLowerCase() + 
              g.gpuline.toLowerCase() + 
              g.model.toLowerCase()
            ).includes(searchGpu.toLowerCase())
          )
        )
        setGpusFound(filteredGpus)
      } else {
        setGpusFound([])
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [searchGpu, gpus]);

  const handleSearchGpu = (event) => {
    setSearchGpu(event.target.value);
  };

  const addGpu = (gpuObject) => {
    if (
        gpuObject.manufacturer === '' ||
        gpuObject.gpuline === '' ||
        gpuObject.model === '' ||
        gpuObject.cores < 1 ||
        gpuObject.tmus < 1 ||
        gpuObject.rops < 1 ||
        gpuObject.vram < 0.02 ||
        gpuObject.bus < 1 ||
        gpuObject.memType === '' ||
        gpuObject.baseclock < 1 ||
        gpuObject.boostclock < 1 ||
        gpuObject.memclock < 1
      ) {
      alert("Invalid GPU data");
      return;
    }

    gpuService
      .create(gpuObject)
      .then(returnedObject => {
        setGpus((prevGpus) => [...prevGpus, returnedObject]) // Functional update for state
        console.log("GPU Specs Submitted:", returnedObject)
        alert(`${returnedObject.manufacturer} ${returnedObject.gpuline} ${returnedObject.model} was added!`)
        gpuFormRef.current.toggleVisibility()
      })
      .catch (exception => {
        alert("Failed to add new GPU")
        console.error("Error adding new GPU:", exception)
      });
  }

  const deleteGpu = (id, manufacturer, gpuline, model) => {
    const confirmDeletion = window.confirm(`Remove ${manufacturer} ${gpuline} ${model} from the list?`);

    if (confirmDeletion) {
      gpuService.remove(id)
      .then(() => {
        // Remove the GPU from the state
        setGpus(gpus.filter(gpu => gpu.id !== id));
      })
      .catch(error => {
        console.error('Error deleting GPU:', error);
      });
    }
  };
  
  function scrollToIndex(gpuTableId) {
    const element = document.getElementById('page-index');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });

      const gpuTable = document.getElementById(gpuTableId);
      const hideButton = gpuTable.querySelector('.show-hide-button');
      const showAllButton = document.getElementById('show-all-button');
      
      if (
        hideButton && 
        hideButton.textContent === 'Hide' && 
        showAllButton.textContent === 'Show all data'
      ) {
        hideButton.click();
      }
    }
  }

  // Helper to render GPU list and index
  const renderGpuList = (gpuList) => (
    <>
      <PageIndex gpusData={gpuList} />
      <div 
        id='show-all-button'
        className='button-area'
      >
        <button
          onClick={() => setShowAll((prev) => !prev)}
        >
          {showAll ? "Hide all data" : "Show all data"}
        </button>
      </div>
      {gpuList.map(gpu => (
        <div key={gpu.id}>
          <Gpu
            gpu={gpu}
            onDelete={deleteGpu}
            showAll={showAll}
            id={`${gpu.manufacturer.toLowerCase()}-${gpu.gpuline.toLowerCase()}-${gpu.model.toLowerCase()}`}
          />
          <button
            className='back-to-index-button'
            onClick={() => scrollToIndex(
              `${gpu.manufacturer.toLowerCase()}-${gpu.gpuline.toLowerCase()}-${gpu.model.toLowerCase()}`
            )}
          >Back to Index</button>
        </div>
      ))}
    </>
  );

  return (
    <>
      <div>
        <h1 id='main-page-title'>GPU List</h1>
        <AddGpuForm 
          createGpu={addGpu}
          ref={gpuFormRef}
        />
        <SearchBar
          handleSearchGpu={handleSearchGpu}
          searchGpu={searchGpu}
          setSearchGpu={setSearchGpu}
        />
        {searchGpu ? (
          gpusFound.length > 0
            ? renderGpuList(gpusFound)
            : <div>No GPUs found</div>
        ) : (
          renderGpuList(gpus)
        )}
      </div>
    </>
  );
}

export default App;