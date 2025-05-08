import { useParams, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import calculatePerformance from '../../calculatePerformance'
import '../../styles/GpuDetail.css'

function GpuDetail({ gpus, onDelete }) {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const gpu = gpus.find(gpu => gpu.id === id)
  
  if (!gpu) {
    return (
      <div className="gpu-detail-container">
        <div className="gpu-detail-card">
          <h2>GPU Not Found</h2>
          <button 
            className="back-button"
            onClick={() => navigate('/')}
          >
            Back to Catalog
          </button>
        </div>
      </div>
    )
  }
  
  const gpuPerformance = calculatePerformance(gpu)
  const brandClass = 
    gpu.manufacturer.toLowerCase() === 'nvidia' ? 'nvidia' :
    gpu.manufacturer.toLowerCase() === 'amd' ? 'amd' :
    gpu.manufacturer.toLowerCase() === 'intel' ? 'intel' : ''
  
  const handleDelete = () => {
    onDelete(gpu.id, gpu.manufacturer, gpu.gpuline, gpu.model)
    navigate('/')
  }
  
  return (
    <div className="gpu-detail-container">
      <div className={`gpu-detail-card ${brandClass}`}>
        <div className="gpu-detail-header">
          <button 
            className="back-button"
            onClick={() => navigate('/')}
          >
            ⬅ Back to Catalog
          </button>
          <h1>{gpu.manufacturer} {gpu.gpuline} {gpu.model}</h1>
        </div>
        
        <div className="gpu-detail-content">
          <div className="gpu-detail-section">
            <h2>Specifications</h2>
            <div className="specs-grid">
              <div className="spec-item">
                <span className="spec-label">Cores</span>
                <span className="spec-value">{gpu.cores}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">TMUs</span>
                <span className="spec-value">{gpu.tmus}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">ROPs</span>
                <span className="spec-value">{gpu.rops}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">VRAM</span>
                <span className="spec-value">{gpu.vram}GB {gpu.memtype}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Bus Width</span>
                <span className="spec-value">{gpu.bus} bit</span>
              </div>
            </div>
          </div>
          
          <div className="gpu-detail-section">
            <h2>Clock Speeds</h2>
            <div className="specs-grid">
              <div className="spec-item">
                <span className="spec-label">Base Clock</span>
                <span className="spec-value">{gpu.baseclock} MHz</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Boost Clock</span>
                <span className="spec-value">{gpu.boostclock} MHz</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Memory Clock</span>
                <span className="spec-value">{gpu.memclock} Gbps</span>
              </div>
            </div>
          </div>
          
          <div className="gpu-detail-section">
            <h2>Performance</h2>
            <div className="specs-grid">
              <div className="spec-item">
                <span className="spec-label">FP32</span>
                <span className="spec-value">{gpuPerformance[0]}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Texture Rate</span>
                <span className="spec-value">{gpuPerformance[1]}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Pixel Rate</span>
                <span className="spec-value">{gpuPerformance[2]}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Bandwidth</span>
                <span className="spec-value">{gpuPerformance[3]}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="gpu-detail-actions">
          <button 
            className="delete-button"
            onClick={handleDelete}
          >
            Delete GPU
          </button>
        </div>
      </div>
    </div>
  )
}

GpuDetail.propTypes = {
  gpus: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default GpuDetail