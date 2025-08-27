import { forwardRef, useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'


const AddGpuForm = forwardRef(({ createGpu }, ref) => {
	const [manufacturer, setManufacturer] = useState('')
	const [gpuline, setGpuLine] = useState('')
	const [model, setModel] = useState('')
	const [cores, setCores] = useState(0)
	const [tmus, setTmus] = useState(0)
	const [rops, setRops] = useState(0)
	const [vram, setVram] = useState(0)
	const [bus, setBus] = useState(0)
	const [memtype, setMemType] = useState('')
	const [baseclock, setBaseClock] = useState(0)
	const [boostclock, setBoostClock] = useState(0)
	const [memclock, setMemClock] = useState(0)
	const [showAddForm, setShowAddForm] = useState(false) // Controls the visibility of the Add GPU form

	useImperativeHandle(ref, () => ({
	    toggleVisibility: () => setShowAddForm(prev => !prev)
  	}))

	const addGpu = (event) => {
		event.preventDefault()
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
		})

		setManufacturer('')
		setGpuLine('')
		setModel('')
		setCores(0)
		setTmus(0)
		setRops(0)
		setVram(0)
		setBus(0)
		setMemType('')
		setBaseClock(0)
		setBoostClock(0)
		setMemClock(0)
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
							<tr>
								<th>
									<label htmlFor="manufacturer">Manufacturer</label>
								</th>
								<td>
									<input 
										type="text"
										id="manufacturer"
										name="manufacturer"
										onChange={event => setManufacturer(event.target.value)} 
										placeholder="NVIDIA"
									/>
								</td>
							</tr>
							<tr>
								<th>
									<label htmlFor="gpuline">GPU Line</label>
								</th>
								<td>
									<input
										type="text"
										id="gpuline"
										name="gpuline"
										onChange={event => setGpuLine(event.target.value)}
										placeholder="GeForce"
									/>
								</td>
							</tr>
							<tr>
								<th>
									<label htmlFor="model">Model</label>
								</th>
								<td>
									<input
										type="text"
										id="model"
										name="model"
										onChange={event => setModel(event.target.value)}
										placeholder="RTX 4090"
									/>
								</td>
							</tr>
							<tr>
								<th>
									<label htmlFor="cores">Cores</label>
								</th>
								<td>
									<input
										type="number"
										id="cores"
										name="cores"
										onChange={event => setCores(event.target.value)}
										placeholder="16384"
									/>
								</td>
							</tr>
							<tr>
								<th>
									<label htmlFor="tmus">TMUs</label>
								</th>
								<td>
									<input
										type="number"
										id="tmus"
										name="tmus"
										onChange={event => setTmus(event.target.value)}
										placeholder="512"
									/>
								</td>
							</tr>
							<tr>
								<th>
									<label htmlFor="rops">ROPs</label>
								</th>
								<td>
									<input
										type="number"
										id="rops"
										name="rops"
										onChange={event => setRops(event.target.value)}
										placeholder="176"
									/>
								</td>
							</tr>
							<tr>
								<th>
									<label htmlFor="vram">VRAM (GB)</label>
								</th>
								<td>
									<input
										type="number"
										id="vram"
										name="vram"
										onChange={event => setVram(event.target.value)}
										placeholder="24"
									/>
								</td>
							</tr>
							<tr>
								<th>
									<label htmlFor="bus">Bus Width</label>
								</th>
								<td>
									<input
										type="number"
										id="bus"
										name="bus"
										onChange={event => setBus(event.target.value)}
										placeholder="384"
									/>
								</td>
							</tr>
							<tr>
								<th>
									<label htmlFor="memtype">Memory Type</label>
								</th>
								<td>
									<input
										type="text"
										id="memtype"
										name="memtype"
										onChange={event => setMemType(event.target.value)}
										placeholder="GDDR6X"
									/>
								</td>
							</tr>
							<tr>
								<th>
									<label htmlFor="baseclock">Base Clock (MHz)</label>
								</th>
								<td>
									<input
										type="number"
										id="baseclock"
										name="baseclock"
										onChange={event => setBaseClock(event.target.value)}
										placeholder="2235"
									/>
								</td>
							</tr>
							<tr>
								<th>
									<label htmlFor="boostclock">Boost Clock (MHz)</label>
								</th>
								<td>
									<input
										type="number"
										id="boostclock"
										name="boostclock"
										onChange={event => setBoostClock(event.target.value)}
										placeholder="2520"
									/>
								</td>
							</tr>
							<tr>
								<th>
									<label htmlFor="memclock">Memory Clock (Gbps)</label>
								</th>
								<td>
									<input
										type="number"
										id="memclock"
										name="memclock"
										step="0.1" // Allows floating number with dots
										onChange={event => setMemClock(event.target.value)}
										placeholder="21"
									/>
								</td>
							</tr>
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
	)
})

AddGpuForm.displayName = "AddGpuForm"

AddGpuForm.propTypes = {
    createGpu: PropTypes.func.isRequired
}

export default AddGpuForm