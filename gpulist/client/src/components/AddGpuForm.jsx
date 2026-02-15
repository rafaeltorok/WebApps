import { useState, useContext } from "react";

import FormRow from "./FormRow";
import GpuContext from "../GpuContext";

import "../styles/AddGpuForm.css";

export default function AddGpuForm() {
  const {
    createGpu,
    state: { showAddForm },
    dispatch,
  } = useContext(GpuContext);

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
    memclock: "",
  });

  const addGpu = (event) => {
    event.preventDefault();

    if (
      gpu.manufacturer.trim() === "" ||
      gpu.model.trim() === "" ||
      Number(gpu.cores.trim()) < 1 ||
      Number(gpu.tmus.trim()) < 1 ||
      Number(gpu.rops.trim()) < 1 ||
      Number(gpu.vram.trim()) < 0.016 ||
      Number(gpu.bus.trim()) < 1 ||
      gpu.memtype.trim() === "" ||
      Number(gpu.baseclock.trim()) < 1 ||
      Number(gpu.boostclock.trim()) < 1 ||
      Number(gpu.memclock.trim()) < 0.1
    ) {
      alert("Invalid GPU data");
      return false;
    }

    const response = createGpu({
      manufacturer: gpu.manufacturer.trim(),
      gpuline: gpu.gpuline.trim(),
      model: gpu.model.trim(),
      cores: gpu.cores === "" ? null : Number(gpu.cores.trim()),
      tmus: gpu.tmus === "" ? null : Number(gpu.tmus.trim()),
      rops: gpu.rops === "" ? null : Number(gpu.rops.trim()),
      vram: gpu.vram === "" ? null : Number(gpu.vram.trim()),
      bus: gpu.bus === "" ? null : Number(gpu.bus.trim()),
      memtype: gpu.memtype.trim(),
      baseclock: gpu.baseclock === "" ? null : Number(gpu.baseclock.trim()),
      boostclock: gpu.boostclock === "" ? null : Number(gpu.boostclock.trim()),
      memclock: gpu.memclock === "" ? null : Number(gpu.memclock.trim()),
    });

    if (response) {
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
        memclock: "",
      });
      dispatch({
        type: "TOGGLE_ADD_FORM",
      });
    }
  };

  return (
    <div>
      <form onSubmit={addGpu} id="add-gpu-form">
        <table id="add-gpu-table">
          <thead>
            <tr>
              <th colSpan={2} id="add-gpu-table-header">
                <button
                  id="add-gpu-button"
                  type="button"
                  onClick={() =>
                    dispatch({
                      type: "TOGGLE_ADD_FORM",
                    })
                  }
                >
                  {showAddForm ? "Cancel" : "Add Graphics Card"}
                </button>
              </th>
            </tr>
          </thead>
          {showAddForm && (
            <tbody>
              <FormRow
                id="manufacturer"
                type="text"
                label="Manufacturer"
                placeholder="NVIDIA"
                value={gpu.manufacturer}
                onChange={(e) =>
                  setGpu({ ...gpu, manufacturer: e.target.value })
                }
              />
              <FormRow
                id="gpuline"
                type="text"
                label="GPU Line"
                placeholder="GeForce"
                value={gpu.gpuline}
                onChange={(e) => setGpu({ ...gpu, gpuline: e.target.value })}
              />
              <FormRow
                id="model"
                type="text"
                label="Model"
                placeholder="RTX 4090"
                value={gpu.model}
                onChange={(e) => setGpu({ ...gpu, model: e.target.value })}
              />
              <FormRow
                id="cores"
                type="number"
                label="Cores"
                placeholder="16384"
                value={gpu.cores}
                onChange={(e) => setGpu({ ...gpu, cores: e.target.value })}
              />
              <FormRow
                id="tmus"
                type="number"
                label="TMUs"
                placeholder="512"
                value={gpu.tmus}
                onChange={(e) => setGpu({ ...gpu, tmus: e.target.value })}
              />
              <FormRow
                id="rops"
                type="number"
                label="ROPs"
                placeholder="176"
                value={gpu.rops}
                onChange={(e) => setGpu({ ...gpu, rops: e.target.value })}
              />
              <FormRow
                id="vram"
                type="number"
                label="VRAM (GB)"
                placeholder="24"
                value={gpu.vram}
                onChange={(e) => setGpu({ ...gpu, vram: e.target.value })}
              />
              <FormRow
                id="bus"
                type="number"
                label="Bus Width (bits)"
                placeholder="384"
                value={gpu.bus}
                onChange={(e) => setGpu({ ...gpu, bus: e.target.value })}
              />
              <FormRow
                id="memtype"
                type="text"
                label="Memory Type"
                placeholder="GDDR6X"
                value={gpu.memtype}
                onChange={(e) => setGpu({ ...gpu, memtype: e.target.value })}
              />
              <FormRow
                id="baseclock"
                type="number"
                label="Base Clock (MHz)"
                placeholder="2235"
                value={gpu.baseclock}
                onChange={(e) => setGpu({ ...gpu, baseclock: e.target.value })}
              />
              <FormRow
                id="boostclock"
                type="number"
                label="Boost Clock (Mhz)"
                placeholder="2520"
                value={gpu.boostclock}
                onChange={(e) => setGpu({ ...gpu, boostclock: e.target.value })}
              />
              <FormRow
                id="memclock"
                type="number"
                label="Memory Clock (Gbps)"
                placeholder="21"
                value={gpu.memclock}
                onChange={(e) => setGpu({ ...gpu, memclock: e.target.value })}
              />
              <tr>
                <td colSpan={2}>
                  <button id="add-gpu-submit-button" type="submit">
                    Submit
                  </button>
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </form>
    </div>
  );
}

AddGpuForm.displayName = "AddGpuForm";
