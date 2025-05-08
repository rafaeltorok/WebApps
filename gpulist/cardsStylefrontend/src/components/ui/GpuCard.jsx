import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import '../../styles/GpuCard.css'

function GpuCard({ gpu }) {  
  const brandClass = 
    gpu.manufacturer.toLowerCase() === 'nvidia' ? 'nvidia' :
    gpu.manufacturer.toLowerCase() === 'amd' ? 'amd' :
    gpu.manufacturer.toLowerCase() === 'intel' ? 'intel' : ''
  
  return (
    <Link to={`/gpu/${gpu.id}`} className="gpu-card-link">
      <div className={`gpu-card ${brandClass}`}>
        <div className="gpu-card-header">
          <h2>{gpu.manufacturer} {gpu.gpuline}</h2>
          <h3>{gpu.model}</h3>
        </div>
        
        <div className="gpu-card-specs">
          <div className="gpu-card-spec">
            <span className="spec-label">VRAM</span>
            <span className="spec-value">{gpu.vram}GB {gpu.memtype}</span>
          </div>
        </div>
        
        <div className="gpu-card-footer">
          <span className="view-details">View Details</span>
        </div>
      </div>
    </Link>
  )
}

GpuCard.propTypes = {
  gpu: PropTypes.shape({
    id: PropTypes.string.isRequired,
    manufacturer: PropTypes.string.isRequired,
    gpuline: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    cores: PropTypes.number.isRequired,
    tmus: PropTypes.number.isRequired,
    rops: PropTypes.number.isRequired,
    vram: PropTypes.number.isRequired,
    bus: PropTypes.number.isRequired,
    memtype: PropTypes.string.isRequired,
    baseclock: PropTypes.number.isRequired,
    boostclock: PropTypes.number.isRequired,
    memclock: PropTypes.number.isRequired
  }).isRequired
}

export default GpuCard