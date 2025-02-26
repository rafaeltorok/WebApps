import { useState, useEffect, forwardRef } from 'react';
import PropTypes from 'prop-types'
import calculatePerformance from '../calculatePerformance.js';


const GPU = forwardRef(({ gpu, onDelete, showAll }, ref) => {
	const gpuPerformance = calculatePerformance(gpu)
	const [showBody, setShowBody] = useState(false)

	// Sync individual state with global "Show All" toggle
	useEffect(() => {
		setShowBody(showAll)
	}, [showAll])

	return (
		<table 
			className='gpu-data-table'
			ref={ref} // Forward the ref to the table element
		>
			<thead>
				<tr>
					<th className={
							gpu.manufacturer.toLowerCase() === 'nvidia'
							? 'nvidia-model-header'
							: gpu.manufacturer.toLowerCase() === 'amd'
							? 'amd-model-header'
							: gpu.manufacturer.toLowerCase() === 'intel'
							? 'intel-model-header'
							: gpu.gpuline.toLowerCase() === 'geforce'
							? 'nvidia-model-header'
							: gpu.gpuline.toLowerCase() === 'radeon'
							? 'amd-model-header'
							: gpu.gpuline.toLowerCase() === 'arc'
							? 'intel-model-header'
							: 'model-header'
						}
						colSpan={2}
					>
						{gpu.manufacturer} {gpu.gpuline} {gpu.model}
					</th>
				</tr>
				<tr>
					<th colSpan={2} className='table-header'>
						<button
							className='show-hide-button'
							onClick={() => setShowBody(!showBody)}
						>
							{showBody ? "Hide" : "Show"}
						</button>
					</th>
				</tr>
			</thead>
			{showBody && (
				<tbody>
					<tr>
						<th className="table-header" colSpan={2}>SPECIFICATIONS</th>
					</tr>
					<tr>
						<th>CORES</th>
						<td>{gpu.cores}</td>
					</tr>
					<tr>
						<th>TMUs</th>
						<td>{gpu.tmus}</td>
					</tr>
					<tr>
						<th>ROPs</th>
						<td>{gpu.rops}</td>
					</tr>
					<tr>
						<th>VRAM</th>
						<td>{gpu.vram}GB {gpu.memtype}</td>
					</tr>
					<tr>
						<th>BUS WIDTH</th>
						<td>{gpu.bus} bit</td>
					</tr>
					<tr>
						<th className="table-header" colSpan={2}>CLOCK SPEEDS</th>
					</tr>
					<tr>
						<th>BASE CLOCK</th>
						<td>{gpu.baseclock} MHz</td>
					</tr>
					<tr>
						<th>BOOST CLOCK</th>
						<td>{gpu.boostclock} MHz</td>
					</tr>
					<tr>
						<th>MEMORY CLOCK</th>
						<td>{gpu.memclock} Gbps effective</td>
					</tr>
					<tr>
						<th className="table-header" colSpan={2}>THEORETICAL PERFORMANCE</th>
					</tr>
					<tr>
						<th>FP32(float)</th>
						<td>{gpuPerformance[0]}</td>
					</tr>
					<tr>
						<th>TEXTURE RATE</th>
						<td>{gpuPerformance[1]}</td>
					</tr>
					<tr>
						<th>PIXEL RATE</th>
						<td>{gpuPerformance[2]}</td>
					</tr>
					<tr>
						<th>BANDWIDTH</th>
						<td>{gpuPerformance[3]}</td>
					</tr>
					<tr>
						<td colSpan={"2"} id='delete-gpu-button'>
							<button onClick={() => onDelete(gpu.id, gpu.manufacturer, gpu.gpuline, gpu.model)}>Delete</button>
						</td>
					</tr>
				</tbody>
			)}
		</table>
	)
})

GPU.displayName = "GPU"

GPU.propTypes = {
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
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  showAll: PropTypes.bool.isRequired
}

export default GPU