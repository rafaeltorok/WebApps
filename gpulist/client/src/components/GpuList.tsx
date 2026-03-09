// React context
import { useContext } from "react";
import GpuContext from "../GpuContext.js";

// React components
import Gpu from "./Gpu.jsx";

// TypeScript types
import type { GpuType } from "../types.js";

export default function GpuList() {
  const {
    state: { gpus, searchGpu, gpusFound },
  } = useContext(GpuContext);

  function scrollToIndex(gpuTableId: string) {
    const element = document.getElementById("add-gpu-form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });

      let hideButton: HTMLButtonElement | null;
      const gpuTable = document.getElementById(gpuTableId);
      if (gpuTable) {
        hideButton = gpuTable.querySelector(".show-hide-button");
      }
      const showAllButton: HTMLElement | null = document.getElementById("show-all-button");

      if (
        hideButton &&
        hideButton.textContent === "Hide" &&
        showAllButton?.textContent === "Show all data"
      ) {
        hideButton.click();
      }
    }
  }

  function renderGpuList(gpuList: GpuType[]) {
    return (
      <>
        {gpuList.map((gpu) => (
          <div key={gpu.id}>
            <Gpu gpu={gpu} />
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
