import { useState, useEffect, useRef } from 'react'
import GPU from './components/GPU'
import AddGpuForm from './components/AddGpuForm'
import PageIndex from './components/PageIndex'
import gpuService from './services/gpus'
import './App.css'

function App() {
  const [gpus, setGpus] = useState([])
  const [showAll, setShowAll] = useState(false) // Controls the visibility of all tables

  const gpuFormRef = useRef()
  const gpuRefs = useRef({}) // Create a ref to store GPU elements
  const topRef = useRef() // Create a ref for the top <h1> element

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

  const scrollToIndex = () => {
    topRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <div>
        <h1 ref={topRef}>GPU List</h1> {/* Add ref to the <h1> element */}
        <AddGpuForm 
          createGpu={addGpu}
          ref={gpuFormRef}
        />
        <PageIndex
          gpusData={gpus}
          gpuRefs={gpuRefs}
        />
        <div className='button-area'>
          <button
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll ? "Hide All data" : "Show All data"}
          </button>
        </div>
        {gpus.map(gpu => (
          <div key={gpu.id}>
            <GPU 
              gpu={gpu} 
              onDelete={deleteGpu}
              showAll={showAll}
              ref={(element) => gpuRefs.current[gpu.id] = element}
            />
            <button 
              className='back-to-index-button'
              onClick={scrollToIndex}
            >Back to Index</button>
          </div>
        ))}
      </div>
    </>
  )
}

export default App