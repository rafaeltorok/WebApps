import calculatePerformance from '../calculatePerformance.js';


function GPU(props) {
    const gpuPerformance = calculatePerformance(props.gpu);
    return (
        <table id='gpu-data-table'>
            <thead>
                <tr>
                    <th className={props.gpu.manufacturer.toLowerCase() === 'nvidia'
                    ? 'nvidia-model-header'
                    : props.gpu.manufacturer.toLowerCase() === 'amd'
                    ? 'amd-model-header'
                    : props.gpu.manufacturer.toLowerCase() === 'intel'
                    ? 'intel-model-header'
                    : 'model-header'}
                    colSpan={2}>
                        {props.gpu.manufacturer} {props.gpu.gpuline} {props.gpu.model}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th className="table-header" colSpan={2}>SPECIFICATIONS</th>
                </tr>
                <tr>
                    <th>CORES</th>
                    <td>{props.gpu.cores}</td>
                </tr>
                <tr>
                    <th>TMUs</th>
                    <td>{props.gpu.tmus}</td>
                </tr>
                <tr>
                    <th>ROPs</th>
                    <td>{props.gpu.rops}</td>
                </tr>
                <tr>
                    <th>VRAM</th>
                    <td>{props.gpu.vram}GB {props.gpu.memtype}</td>
                </tr>
                <tr>
                    <th>BUS WIDTH</th>
                    <td>{props.gpu.bus} bit</td>
                </tr>
                <tr>
                    <th className="table-header" colSpan={2}>CLOCK SPEEDS</th>
                </tr>
                <tr>
                    <th>BASE CLOCK</th>
                    <td>{props.gpu.baseclock} MHz</td>
                </tr>
                <tr>
                    <th>BOOST CLOCK</th>
                    <td>{props.gpu.boostclock} MHz</td>
                </tr>
                <tr>
                    <th>MEMORY CLOCK</th>
                    <td>{props.gpu.memclock} Gbps effective</td>
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
                    <td colSpan={"2"} id='delete-gpu-button'><button onClick={() => props.onDelete(props.gpu.id)}>Delete</button></td>
                </tr>
            </tbody>
        </table>
    );
}

export default GPU;