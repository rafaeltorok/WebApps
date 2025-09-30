import { useState } from 'react';
import FormRow from './FormRow';
import PropTypes from 'prop-types';
import '../styles/AddGpuForm.css';


export default function AddGpuForm ({ createGpu, showAddForm, setShowAddForm }) {
	const [gpu, setGpu] = useState({
		manufacturer: "",
		gpuline: "",
		model: "",
		cores: "",
		tmus: "",
		rops: "",
		vram: "",
		bus: "",
		memtype: "",
		baseclock: "",
		boostclock: "",
		memclock: ""
	});

	const addGpu = (event) => {
		event.preventDefault();
		createGpu(gpu);

		setGpu({
			manufacturer: "",
			gpuline: "",
			model: "",
			cores: "",
			tmus: "",
			rops: "",
			vram: "",
			bus: "",
			memtype: "",
			baseclock: "",
			boostclock: "",
			memclock: ""
		});
	}

	return (
		<div>
			<form onSubmit={addGpu} id='add-gpu-form'>
				<table id="add-gpu-table">
					<thead>
						<tr>
							<th colSpan={2} id='add-gpu-table-header'>
								<button
									id='add-gpu-button'
									type='button'
									onClick={() => setShowAddForm((prev) => !prev)}
								>
									{showAddForm ? "Cancel" : "Add Graphics Card"}
								</button>
							</th>
						</tr>
					</thead>
					{showAddForm && (
						<tbody>
							<FormRow 
								id="manufacturer" type="text" label="Manufacturer" placeholder="NVIDIA" 
								value={gpu.manufacturer} 
								onChange={(e) => 
									setGpu({ ...gpu, manufacturer: e.target.value })
								}
							/>
							<FormRow 
								id="gpuline" type="text" label="GPU Line" placeholder="GeForce" 
								value={gpu.gpuline} 
								onChange={(e) => 
									setGpu({ ...gpu, gpuline: e.target.value })
								}
							/>
							<FormRow 
								id="model" type="text" label="Model" placeholder="RTX 4090" 
								value={gpu.model}
								onChange={(e) => 
									setGpu({ ...gpu, model: e.target.value })
								}
							/>
							<FormRow 
								id="cores" type="number" label="Cores" placeholder="16384" 
								value={gpu.cores} 
								onChange={(e) => 
									setGpu({ ...gpu, cores: e.target.value })
								}
							/>
							<FormRow 
								id="tmus" type="number" label="TMUs" placeholder="512" 
								value={gpu.tmus} 
								onChange={(e) => 
									setGpu({ ...gpu, tmus: e.target.value })
								}
							/>
							<FormRow 
								id="rops" type="number" label="ROPs" placeholder="176" 
								value={gpu.rops} 
								onChange={(e) => 
									setGpu({ ...gpu, rops: e.target.value })
								}
							/>
							<FormRow 
								id="vram" type="number" label="VRAM (GB)" placeholder="24" 
								value={gpu.vram} 
								onChange={(e) => 
									setGpu({ ...gpu, vram: e.target.value })
								}
							/>
							<FormRow 
								id="bus" type="number" label="Bus Width (bits)" placeholder="384" 
								value={gpu.bus} 
								onChange={(e) => 
									setGpu({ ...gpu, bus: e.target.value })
								}
							/>
							<FormRow 
								id="memtype" type="text" label="Memory Type" placeholder="GDDR6X" 
								value={gpu.memtype}
								onChange={(e) => 
									setGpu({ ...gpu, memtype: e.target.value })
								}
							/>
							<FormRow 
								id="baseclock" type="number" label="Base Clock (MHz)" placeholder="2235" 
								value={gpu.baseclock} 
								onChange={(e) => 
									setGpu({ ...gpu, baseclock: e.target.value })
								}
							/>
							<FormRow 
								id="boostclock" type="number" label="Boost Clock (Mhz)" placeholder="2520" 
								value={gpu.boostclock} 
								onChange={(e) => 
									setGpu({ ...gpu, boostclock: e.target.value })
								}
							/>
							<FormRow 
								id="memclock" type="number" label="Memory Clock (Gbps)" placeholder="21" 
								value={gpu.memclock} 
								onChange={(e) => 
									setGpu({ ...gpu, memclock: e.target.value })
								}
							/>
							<tr>
								<td colSpan={2}>
									<button 
										id='add-gpu-submit-button'
										type="submit"
									>Submit</button>
								</td>
							</tr>
						</tbody>
					)}
				</table>
			</form>
		</div>
	);
};

AddGpuForm.displayName = "AddGpuForm";

AddGpuForm.propTypes = {
	createGpu: PropTypes.func.isRequired,
	showAddForm: PropTypes.bool.isRequired,
	setShowAddForm: PropTypes.func.isRequired
};
