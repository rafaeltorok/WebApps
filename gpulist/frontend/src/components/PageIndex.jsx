import { forwardRef, useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'


const PageIndex = forwardRef(({ gpusData, gpuRefs, showAll }, ref) => {
  const [showIndex, setShowIndex] = useState(false) // Controls the visibility of the Add GPU form

  useImperativeHandle(ref, () => ({
    toggleVisibility: () => setShowIndex(prev => !prev)
  }))

  // Scroll to gpu when index item is clicked
  const scrollToGpu = (id) => {
		const gpuElement = gpuRefs.current[id]
		if (gpuElement) {
			gpuElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
			if (!showAll) {
				const showButton = gpuElement.querySelector('.show-hide-button')
				if (showButton && showButton.textContent === 'Show') {
					showButton.click()
				}
			}
		}
  }
  
  return (
    <div id="page-index">      
			<h2 className='page-index-title'>
				<button
					id='show-index-button'
					type='button'
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
								className='index-item-button'
								onClick={() => scrollToGpu(gpu.id)} 
							>
								<span
									className={
										gpu.manufacturer.toLowerCase() === 'nvidia'
										? 'nvidia-model-header'
										: gpu.manufacturer.toLowerCase() === 'amd'
										? 'amd-model-header'
										: gpu.manufacturer.toLowerCase() === 'intel'
										? 'intel-model-header'
										: gpu.gpuline.toLowerCase() === 'geforce'
										? 'nvidia-model-header'
										: gpu.gpuline.toLowerCase() === 'radeon'
										? 'amd-model-header'
										: gpu.gpuline.toLowerCase() === 'arc'
										? 'intel-model-header'
										: 'model-header'
									}
									>{gpu.manufacturer} {gpu.gpuline} {gpu.model}
								</span>
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
  )
})

PageIndex.displayName = "PageIndex"

PageIndex.propTypes = {
	gpusData: PropTypes.array.isRequired,
	gpuRefs: PropTypes.object.isRequired,
	showAll: PropTypes.bool.isRequired
}

export default PageIndex