import { useContext } from "react";

import GpuContext from "../GpuContext";

import Gpu from "./Gpu.jsx";

export default function GpuList() {
  const { scrollToIndex, gpus, searchGpu, gpusFound } = useContext(GpuContext);

  function renderGpuList(gpuList) {
    return (
      <>
        {gpuList.map((gpu) => (
          <div key={gpu.id}>
            <Gpu
              gpu={gpu}
            />
            <button
              className="back-to-index-button"
              onClick={() =>
                scrollToIndex(
                  `${gpu.manufacturer.toLowerCase()}-${gpu.gpuline.toLowerCase()}-${gpu.model.toLowerCase()}`,
                )
              }
            >
              Back to Index
            </button>
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      {searchGpu ? (
        gpusFound.length > 0 ? (
          renderGpuList(gpusFound)
        ) : (
          <div>No GPUs found</div>
        )
      ) : (
        renderGpuList(gpus)
      )}
    </>
  );
}

GpuList.displayName = "GpuList";
