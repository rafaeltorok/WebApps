import { useState, useContext } from "react";
import GpuContext from "../GpuContext";

import "../styles/PageIndex.css";

export default function PageIndex() {
  const { gpus, searchGpu, gpusFound } = useContext(GpuContext);
  const [showIndex, setShowIndex] = useState(false); // Controls the visibility of the Add GPU form

  // Scroll to gpu when index item is clicked
  const scrollToGpu = (id) => {
    const gpuTable = document.getElementById(id);
    if (gpuTable) {
      gpuTable.scrollIntoView({ behavior: "smooth" });
      const button = gpuTable.querySelector(".show-hide-button");
      if (button && button.textContent === "Show") {
        button.click();
      }
    }
  };

  function renderIndexItems(gpuList) {
    return (
      <>
        {gpuList.map((gpu) => (
          <li key={gpu.id}>
            <button
              className="index-item-button"
              onClick={() =>
                scrollToGpu(
                  `${gpu.manufacturer.toLowerCase()}-${gpu.gpuline.toLowerCase()}-${gpu.model.toLowerCase()}`,
                )
              }
            >
              <span
                className={
                  gpu.manufacturer.toLowerCase() === "nvidia"
                    ? "nvidia-model-header"
                    : gpu.manufacturer.toLowerCase() === "amd"
                      ? "amd-model-header"
                      : gpu.manufacturer.toLowerCase() === "intel"
                        ? "intel-model-header"
                        : gpu.gpuline.toLowerCase() === "geforce"
                          ? "nvidia-model-header"
                          : gpu.gpuline.toLowerCase() === "radeon"
                            ? "amd-model-header"
                            : gpu.gpuline.toLowerCase() === "arc"
                              ? "intel-model-header"
                              : "model-header"
                }
              >
                {gpu.manufacturer} {gpu.gpuline} {gpu.model}
              </span>
            </button>
          </li>
        ))}
      </>
    );
  }

  return (
    <div id="page-index">
      <h2 className="page-index-title">
        <button
          id="show-index-button"
          type="button"
          onClick={() => setShowIndex((prev) => !prev)}
        >
          {showIndex ? "Hide index" : "Show index"}
        </button>
      </h2>
      {showIndex && (
        <ul className="page-index-list">
          {searchGpu ? renderIndexItems(gpusFound) : renderIndexItems(gpus)}
        </ul>
      )}
    </div>
  );
}

PageIndex.displayName = "PageIndex";
