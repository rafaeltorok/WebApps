import { useState, useEffect, useRef } from 'react'
import GPU from './components/GPU'
import AddGpuForm from './components/AddGpuForm'
import gpuService from './services/gpus'
import './App.css'

function App() {
  const [gpus, setGpus] = useState([])
  const [showAll, setShowAll] = useState(false) // Controls the visibility of all tables

  const gpuFormRef = useRef()

  useEffect(() => {
    gpuService
      .getAll()
      .then(initialGpuList => {
        setGpus(initialGpuList)
      })
  }, [])

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
      alert("Invalid GPU data")
      return
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
      })
  }

  const deleteGpu = (id, manufacturer, gpuline, model) => {
    const confirmDeletion = window.confirm(`Remove ${manufacturer} ${gpuline} ${model} from the list?`);

    if (confirmDeletion) {
      gpuService.remove(id)
      .then(() => {
        // Remove the GPU from the state
        setGpus(gpus.filter(gpu => gpu.id !== id))
      })
      .catch(error => {
        console.error('Error deleting GPU:', error)
      })
    }
  }

  return (
    <>
      <div>
        <h1>GPU List</h1>
        <AddGpuForm 
          createGpu={addGpu}
          ref={gpuFormRef}
        />
        <div className='button-area'>
          <button
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll ? "Hide All data" : "Show All data"}
          </button>
        </div>
        {gpus.map(gpu => (
          <GPU 
            key={gpu.id} 
            gpu={gpu} 
            onDelete={deleteGpu}
            showAll={showAll}
          />
        ))}
      </div>
    </>
  )
}

export default App