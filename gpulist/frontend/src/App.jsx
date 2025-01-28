import { useState, useEffect } from 'react';
import GPU from './components/GPU';
import gpuService from './services/gpus'
import './App.css';

function App() {
  const [gpus, setGpus] = useState(null);

  useEffect(() => {
    gpuService
      .getAll()
      .then(gpuData => {
        setGpus(gpuData);
        console.log(gpus)
      })
  }, []);
  
  if (!gpus) {
    return null;
  }

  return (
    <>
      <div>
        <h1>GPU List</h1>
        {gpus.map(gpu => (
          <GPU key={gpu.id} gpu={gpu} />
        ))}
      </div>
    </>
  )
}

export default App;