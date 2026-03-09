// Component dependencies
import { useState, useEffect, useContext } from "react";
import GpuContext from "../GpuContext.js";

// Utils
import calculatePerformance from "../utils/calculatePerformance.js";

// React components
import GpuDataRow from "./GpuDataRow.js";

// TypeScript types
import type { GpuType } from "../types.js";

// CSS Styles
import "../styles/Gpu.css";
import "../styles/ManufacturerColors.css";

type GpuProps = {
  gpu: GpuType;
}

export default function Gpu({ gpu }: GpuProps) {
  const [showBody, setShowBody] = useState(false);
  const {
    deleteGpu,
    state: { showAll },
  } = useContext(GpuContext);
  const gpuPerformance = calculatePerformance(gpu);
  const vramToDisplay = gpu.vram < 1 ? `${gpu.vram * 1000}MB` : `${gpu.vram}GB`;

  // Sync individual state with global "Show All" toggle
  useEffect(() => {
    setShowBody(showAll);
  }, [showAll]);

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
  const gpuHeaderClass =
    headerClassMap[m] ?? headerClassMap[line] ?? "model-header";

  return (
    <table
      id={`${gpu.manufacturer.toLowerCase()}-${gpu.gpuline.toLowerCase()}-${gpu.model.toLowerCase()}`}
      className="gpu-data-table"
      aria-label={`${gpu.manufacturer} ${gpu.gpuline} ${gpu.model}`}
    >
      <thead>
        <tr>
          <th className={gpuHeaderClass} colSpan={2}>
            {/* Filters out an empty GPU line to prevent two whitespaces in the full model name */}
            {[gpu.manufacturer, gpu.gpuline, gpu.model]
              .filter(Boolean)
              .join(" ")}
          </th>
        </tr>
        <tr>
          <th colSpan={2} className="table-header">
            <button
              className="show-hide-button"
              onClick={() => setShowBody(!showBody)}
              aria-expanded={showBody}
              aria-controls={`${gpu.id}-specs ${gpu.id}-clocks ${gpu.id}-performance ${gpu.id}-delete`}
            >
              {showBody ? "Hide" : "Show"}
            </button>
          </th>
        </tr>
      </thead>
      {showBody && (
        <>
          <tbody
            id={`${gpu.id}-specs`}
            aria-labelledby={`${gpu.id}-specs-heading`}
          >
            <tr>
              <th className="table-header" colSpan={2}>
                SPECIFICATIONS
              </th>
            </tr>
            <GpuDataRow
              header="CORES"
              data={`${gpu.cores}`}
              headerClass={gpuHeaderClass}
            />
            <GpuDataRow
              header="TMUs"
              data={`${gpu.tmus}`}
              headerClass={gpuHeaderClass}
            />
            <GpuDataRow
              header="ROPs"
              data={`${gpu.rops}`}
              headerClass={gpuHeaderClass}
            />
            <GpuDataRow
              header="VRAM"
              data={`${vramToDisplay} ${gpu.memtype}`}
              headerClass={gpuHeaderClass}
            />
            <GpuDataRow
              header="BUS WIDTH"
              data={`${gpu.bus} bit`}
              headerClass={gpuHeaderClass}
            />
          </tbody>

          <tbody
            id={`${gpu.id}-clocks`}
            aria-labelledby={`${gpu.id}-clocks-heading`}
          >
            <tr>
              <th className="table-header" colSpan={2}>
                CLOCK SPEEDS
              </th>
            </tr>
            <GpuDataRow
              header="BASE CLOCK"
              data={`${gpu.baseclock} MHz`}
              headerClass={gpuHeaderClass}
            />
            <GpuDataRow
              header="BOOST CLOCK"
              data={`${gpu.boostclock} MHz`}
              headerClass={gpuHeaderClass}
            />
            <GpuDataRow
              header="MEMORY CLOCK"
              data={`${gpu.memclock} Gbps effective`}
              headerClass={gpuHeaderClass}
            />
          </tbody>

          <tbody
            id={`${gpu.id}-performance`}
            aria-labelledby={`${gpu.id}-performance-heading`}
          >
            <tr>
              <th className="table-header" colSpan={2}>
                THEORETICAL PERFORMANCE
              </th>
            </tr>
            <GpuDataRow
              header="FP32(float)"
              data={`${gpuPerformance[0]}`}
              headerClass={gpuHeaderClass}
            />
            <GpuDataRow
              header="TEXTURE RATE"
              data={`${gpuPerformance[1]}`}
              headerClass={gpuHeaderClass}
            />
            <GpuDataRow
              header="PIXEL RATE"
              data={`${gpuPerformance[2]}`}
              headerClass={gpuHeaderClass}
            />
            <GpuDataRow
              header="BANDWIDTH"
              data={`${gpuPerformance[3]}`}
              headerClass={gpuHeaderClass}
            />
          </tbody>

          <tfoot id={`${gpu.id}-delete`}>
            <tr>
              <td colSpan={2} id="delete-gpu-button">
                <button
                  aria-label={`Delete ${gpu.manufacturer} ${gpu.gpuline} ${gpu.model}`}
                  onClick={() =>
                    deleteGpu(gpu.id, gpu.manufacturer, gpu.gpuline, gpu.model)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          </tfoot>
        </>
      )}
    </table>
  );
}
