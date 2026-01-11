import { useState } from "react";
import PropTypes from "prop-types";
import "../styles/PageIndex.css";

export default function PageIndex({ gpusData }) {
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
          {gpusData.map((gpu) => (
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
        </ul>
      )}
    </div>
  );
}

PageIndex.displayName = "PageIndex";

PageIndex.propTypes = {
  gpusData: PropTypes.array.isRequired,
};
