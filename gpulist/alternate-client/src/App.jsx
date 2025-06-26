import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './components/pages/Home'
import GpuDetail from './components/pages/GpuDetail'
import gpuService from './services/gpus'
import './styles/App.css'

function App() {
  const [gpus, setGpus] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  
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
        setGpus((prevGpus) => [...prevGpus, returnedObject])
        alert(`${returnedObject.manufacturer} ${returnedObject.gpuline} ${returnedObject.model} was added!`)
      })
      .catch(exception => {
        alert("Failed to add new GPU")
        console.error("Error adding new GPU:", exception)
      })
  }

  const deleteGpu = (id, manufacturer, gpuline, model) => {
    const confirmDeletion = window.confirm(`Remove ${manufacturer} ${gpuline} ${model} from the list?`)

    if (confirmDeletion) {
      gpuService.remove(id)
      .then(() => {
        setGpus(gpus.filter(gpu => gpu.id !== id))
      })
      .catch(error => {
        console.error('Error deleting GPU:', error)
      })
    }
  }

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  const filteredGpus = gpus.filter(gpu => {
    const fullName = `${gpu.manufacturer} ${gpu.gpuline} ${gpu.model}`.toLowerCase()
    return fullName.includes(searchTerm.toLowerCase())
  })

  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route 
              path="/" 
              element={
                <Home 
                  gpus={filteredGpus} 
                  onSearch={handleSearch}
                  searchTerm={searchTerm}
                  addGpu={addGpu}
                />
              } 
            />
            <Route 
              path="/gpu/:id" 
              element={
                <GpuDetail 
                  gpus={gpus}
                  onDelete={deleteGpu}
                />
              } 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App