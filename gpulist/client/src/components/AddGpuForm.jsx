import { forwardRef, useImperativeHandle, useState } from 'react';
import FormRow from './FormRow';
import PropTypes from 'prop-types';
import '../styles/AddGpuForm.css';


const AddGpuForm = forwardRef(({ createGpu }, ref) => {
	const [manufacturer, setManufacturer] = useState('');
	const [gpuline, setGpuLine] = useState('');
	const [model, setModel] = useState('');
	const [cores, setCores] = useState(null);
	const [tmus, setTmus] = useState(null);
	const [rops, setRops] = useState(null);
	const [vram, setVram] = useState(null);
	const [bus, setBus] = useState(null);
	const [memtype, setMemType] = useState('');
	const [baseclock, setBaseClock] = useState(null);
	const [boostclock, setBoostClock] = useState(null);
	const [memclock, setMemClock] = useState(null);
	const [showAddForm, setShowAddForm] = useState(false); // Controls the visibility of the Add GPU form

	useImperativeHandle(ref, () => ({
	    toggleVisibility: () => setShowAddForm(prev => !prev)
  	}));

	const addGpu = (event) => {
		event.preventDefault();
		createGpu({
			manufacturer: manufacturer.trim(),
			gpuline: gpuline.trim(),
			model: model.trim(),
			cores: cores,
			tmus: tmus,
			rops: rops,
			vram: vram,
			bus: bus,
			memtype: memtype.trim(),
			baseclock: baseclock,
			boostclock: boostclock,
			memclock: memclock
		});

		setManufacturer('');
		setGpuLine('');
		setModel('');
		setCores(null);
		setTmus(null);
		setRops(null);
		setVram(null);
		setBus(null);
		setMemType('');
		setBaseClock(null);
		setBoostClock(null);
		setMemClock(null);
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
							<FormRow id="manufacturer" type="text" label="Manufacturer" placeholder="NVIDIA" value={manufacturer} onChange={setManufacturer} />
							<FormRow id="gpuline" type="text" label="GPU Line" placeholder="GeForce" value={gpuline} onChange={setGpuLine} />
							<FormRow id="model" type="text" label="Model" placeholder="RTX 4090" value={model} onChange={setModel} />
							<FormRow id="cores" type="number" label="Cores" placeholder="16384" value={cores} onChange={setCores} />
							<FormRow id="tmus" type="number" label="TMUs" placeholder="512" value={tmus} onChange={setTmus} />
							<FormRow id="rops" type="number" label="ROPs" placeholder="176" value={rops} onChange={setRops} />
							<FormRow id="vram" type="number" label="VRAM (GB)" placeholder="24" value={vram} onChange={setVram} />
							<FormRow id="bus" type="number" label="Bus Width (bits)" placeholder="384" value={bus} onChange={setBus} />
							<FormRow id="memtype" type="text" label="Memory Type" placeholder="GDDR6X" value={memtype} onChange={setMemType} />
							<FormRow id="baseclock" type="number" label="Base Clock (MHz)" placeholder="2235" value={baseclock} onChange={setBaseClock} />
							<FormRow id="boostclock" type="number" label="Boost Clock (Mhz)" placeholder="2520" value={boostclock} onChange={setBoostClock} />
							<FormRow id="memclock" type="number" label="Memory Clock (Gbps)" placeholder="21" value={memclock} onChange={setMemClock} />
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
});

AddGpuForm.displayName = "AddGpuForm";

AddGpuForm.propTypes = {
	createGpu: PropTypes.func.isRequired
};

export default AddGpuForm;