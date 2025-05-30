const gpusRouter = require('express').Router()
const Gpu = require('../models/gpu')
const validateGpu = require("../middlewares/validateGpu") // Import validation middleware

gpusRouter.get('/', (request, response) => {
  Gpu.find({}).then(gpus => {
    response.json(gpus)
  })
})

gpusRouter.get('/:id', (request, response, next) => {
  Gpu.findById(request.params.id)
    .then(gpu => {
      if (gpu) {
        response.json(gpu)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

gpusRouter.post('/', validateGpu, async (request, response, next) => {
  const {
    manufacturer,
    gpuline,
    model,
    cores,
    tmus,
    rops,
    vram,
    bus,
    memtype,
    baseclock,
    boostclock,
    memclock 
  } = request.body

  const existingGpu = await Gpu.findOne(
    {
        manufacturer: { $regex: new RegExp(`^${manufacturer}$`, "i") },
        gpuline: { $regex: new RegExp(`^${gpuline}$`, "i") },
        model: { $regex: new RegExp(`^${model}$`, "i") },
    }
  )

  if (existingGpu) {
    return response.status(409).json({ error: "The graphics card has already been added to the list" })
  }

  const newGpu = new Gpu({
    manufacturer,
    gpuline,
    model,
    cores,
    tmus,
    rops,
    vram,
    bus,
    memtype,
    baseclock,
    boostclock,
    memclock,
  })

  newGpu
    .save()
    .then((savedGpu) => response.json(savedGpu))
    .catch((error) => next(error))
})

gpusRouter.put('/:id', async (request, response) => {
  try {
    const updateFields = request.body

    // Ensure the request body is not empty
    if (Object.keys(updateFields).length === 0) {
      return response.status(400).json({ error: 'No fields provided for update' });
    }

    const updatedGpu = await Gpu.findByIdAndUpdate(
        request.params.id,
        { $set: updateFields },
        { new: true, runValidators: true }
    )

    if (!updatedGpu) {
        return response.status(404).json({ error: 'GPU not found' });
    }

    response.json(updatedGpu)
  } catch (error) {
      response.status(400).json({ error: error.message })
  }
})

gpusRouter.delete('/:id', (request, response, next) => {
  Gpu.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

module.exports = gpusRouter