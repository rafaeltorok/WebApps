import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import calculatePerformance from '../calculatePerformance.js';
import GpuDataRow from './GpuDataRow.jsx';
import '../styles/Gpu.css';
import '../styles/ManufacturerColors.css';


export default function Gpu ({ gpu, onDelete, showAll }) {
	const gpuPerformance = calculatePerformance(gpu)
	const [showBody, setShowBody] = useState(false)

	// Sync individual state with global "Show All" toggle
	useEffect(() => {
		setShowBody(showAll)
	}, [showAll])

	const headerClassMap = {
		nvidia: "nvidia-model-header",
		amd: "amd-model-header",
		intel: "intel-model-header",
		geforce: "nvidia-model-header",
		radeon: "amd-model-header",
		arc: "intel-model-header",
	};

	const m = gpu.manufacturer?.trim().toLowerCase() ?? "";
	const line = gpu.gpuline?.trim().toLowerCase() ?? "";
	const gpuHeaderClass = headerClassMap[m] ?? headerClassMap[line] ?? "model-header";

	return (
		<table 
			id={`${gpu.manufacturer.toLowerCase()}-${gpu.gpuline.toLowerCase()}-${gpu.model.toLowerCase()}`}
			className='gpu-data-table'
		>
			<thead>
				<tr>
					<th className={gpuHeaderClass}
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
					<GpuDataRow header='CORES' data={`${gpu.cores}`} headerClass={gpuHeaderClass} />
					<GpuDataRow header='TMUs' data={`${gpu.tmus}`} headerClass={gpuHeaderClass} />
					<GpuDataRow header='ROPs' data={`${gpu.rops}`} headerClass={gpuHeaderClass} />
					<GpuDataRow header='VRAM' data={`${gpu.vram}GB ${gpu.memtype}`} headerClass={gpuHeaderClass} />
					<GpuDataRow header='BUS WIDTH' data={`${gpu.bus} bit`} headerClass={gpuHeaderClass} />
					<tr>
						<th className="table-header" colSpan={2}>CLOCK SPEEDS</th>
					</tr>
					<GpuDataRow header='BASE CLOCK' data={`${gpu.baseclock} MHz`} headerClass={gpuHeaderClass} />
					<GpuDataRow header='BOOST CLOCK' data={`${gpu.boostclock} MHz`} headerClass={gpuHeaderClass} />
					<GpuDataRow header='MEMORY CLOCK' data={`${gpu.memclock} Gbps effective`} headerClass={gpuHeaderClass} />
					<tr>
						<th className="table-header" colSpan={2}>THEORETICAL PERFORMANCE</th>
					</tr>
					<GpuDataRow header='FP32(float)' data={`${gpuPerformance[0]}`} headerClass={gpuHeaderClass} />
					<GpuDataRow header='TEXTURE RATE' data={`${gpuPerformance[1]}`} headerClass={gpuHeaderClass} />
					<GpuDataRow header='PIXEL RATE' data={`${gpuPerformance[2]}`} headerClass={gpuHeaderClass} />
					<GpuDataRow header='BANDWIDTH' data={`${gpuPerformance[3]}`} headerClass={gpuHeaderClass} />
					<tr>
						<td colSpan={"2"} id='delete-gpu-button'>
							<button onClick={() => onDelete(gpu.id, gpu.manufacturer, gpu.gpuline, gpu.model)}>Delete</button>
						</td>
					</tr>
				</tbody>
			)}
		</table>
	);
}

Gpu.displayName = "Gpu";

Gpu.propTypes = {
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
};