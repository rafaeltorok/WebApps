import { useState, useEffect } from 'react';
import GPU from './components/GPU';
import Form from './components/Form';
import gpuService from './services/gpus';
import './App.css';

function App() {
  const [gpus, setGpus] = useState(null);
  const [newGpu, setNewGpu] = useState({
    manufacturer: "",
    gpuline: "",
    model: "",
    cores: 0,
    tmus: 0,
    rops: 0,
    vram: 0,
    bus: 0,
    memtype: "",
    baseclock: 0,
    boostclock: 0,
    memclock: 0
  });

  useEffect(() => {
    gpuService
      .getAll()
      .then(gpuData => {
        setGpus(gpuData);
      })
  }, []);
  
  if (!gpus) {
    return null;
  }

  const addGpu = (event) => {
    event.preventDefault();
    const gpuObject = {
      manufacturer: newGpu.manufacturer,
      gpuline: newGpu.gpuline,
      model: newGpu.model,
      cores: newGpu.cores,
      tmus: newGpu.tmus,
      rops: newGpu.rops,
      vram: newGpu.vram,
      bus: newGpu.bus,
      memtype: newGpu.memtype,
      baseclock: newGpu.baseclock,
      boostclock: newGpu.boostclock,
      memclock: newGpu.memclock
    };

    if (
        gpuObject.manufacturer === '' ||
        gpuObject.gpuline === '' ||
        gpuObject.model === '' ||
        gpuObject.cores < 1 ||
        gpuObject. tmus < 1 ||
        gpuObject.rops < 1 ||
        gpuObject.vram < 0.02 ||
        gpuObject.bus < 1 ||
        gpuObject.memclock === '' ||
        gpuObject.baseclock < 1 ||
        gpuObject.boostclock < 1 ||
        gpuObject.memclock < 1
      ) {
      console.error(
        `Invalid GPU data`
      );
    } else {
      gpuService
      .create(gpuObject)
      .then(returnedObject => {
        console.log("GPU Specs Submitted:", newGpu);
        setGpus(gpus.concat(returnedObject));
        setNewGpu({
          manufacturer: "",
          gpuline: "",
          model: "",
          cores: 0,
          tmus: 0,
          rops: 0,
          vram: 0,
          bus: 0,
          memtype: "",
          baseclock: 0,
          boostclock: 0,
          memclock: 0
        });
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewGpu((prevSpecs) => ({
      ...prevSpecs,
      [name]: value
    }));
  };

  const deleteGpu = (id) => {
    gpuService.remove(id)
      .then(() => {
        // Remove the GPU from the state
        setGpus(gpus.filter(gpu => gpu.id !== id));
      })
      .catch(error => {
        console.error('Error deleting GPU:', error);
      });
  };

  return (
    <>
      <div>
        <h1>GPU List</h1>
        <Form handleChange={handleChange} onSubmit={addGpu}/>
        {gpus.map(gpu => (
          <GPU 
            key={gpu.id} 
            gpu={gpu} 
            onDelete={deleteGpu}
          />
        ))}
      </div>
    </>
  )
}

export default App;