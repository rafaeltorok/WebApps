function Form({ handleChange, onSubmit }) {
    return (
        <form onSubmit={onSubmit}>
            <table id="add-gpu-table">
                <tbody>
                    <tr>
                        <td colSpan={"2"} id="add-gpu-table-header">Add graphics card</td>
                    </tr>
                    <tr>
                        <th><label htmlFor="manufacturer">Manufacturer</label></th>
                        <td><input type="text" id="manufacturer" name="manufacturer" onChange={handleChange} placeholder="NVIDIA" /></td>
                    </tr>
                    <tr>
                        <th><label htmlFor="gpuline">GPU Line</label></th>
                        <td><input type="text" id="gpuline" name="gpuline" onChange={handleChange} placeholder="GeForce" /></td>
                    </tr>
                    <tr>
                        <th><label htmlFor="model">Model</label></th>
                        <td><input type="text" id="model" name="model" onChange={handleChange} placeholder="RTX 4090" /></td>
                    </tr>
                    <tr>
                        <th><label htmlFor="cores">Cores</label></th>
                        <td><input type="number" id="cores" name="cores" onChange={handleChange} placeholder="16384" /></td>
                    </tr>
                    <tr>
                        <th><label htmlFor="tmus">TMUs</label></th>
                        <td><input type="number" id="tmus" name="tmus" onChange={handleChange} placeholder="512" /></td>
                    </tr>
                    <tr>
                        <th><label htmlFor="rops">ROPs</label></th>
                        <td><input type="number" id="rops" name="rops" onChange={handleChange} placeholder="176" /></td>
                    </tr>
                    <tr>
                        <th><label htmlFor="vram">VRAM (GB)</label></th>
                        <td><input type="number" id="vram" name="vram" onChange={handleChange} placeholder="24" /></td>
                    </tr>
                    <tr>
                        <th><label htmlFor="bus">Bus Width</label></th>
                        <td><input type="number" id="bus" name="bus" onChange={handleChange} placeholder="384" /></td>
                    </tr>
                    <tr>
                        <th><label htmlFor="memtype">Memory Type</label></th>
                        <td><input type="text" id="memtype" name="memtype" onChange={handleChange} placeholder="GDDR6X" /></td>
                    </tr>
                    <tr>
                        <th><label htmlFor="baseclock">Base Clock (MHz)</label></th>
                        <td><input type="number" id="baseclock" name="baseclock" onChange={handleChange} placeholder="2235" /></td>
                    </tr>
                    <tr>
                        <th><label htmlFor="boostclock">Boost Clock (MHz)</label></th>
                        <td><input type="number" id="boostclock" name="boostclock" onChange={handleChange} placeholder="2520" /></td>
                    </tr>
                    <tr>
                        <th><label htmlFor="memclock">Memory Clock (Gbps)</label></th>
                        <td><input type="number" id="memclock" name="memclock" onChange={handleChange} placeholder="21" /></td>
                    </tr>
                    <tr>
                        <td colSpan={"2"}><button type="submit">Submit</button></td>
                    </tr>
                </tbody>
            </table>
        </form>
    );
}

export default Form;