const gpuRouter = require('express').Router()
const Gpu = require('../models/gpu.js')

gpuRouter.post('/reset', async (request, response) => {
  await Gpu.deleteMany({})

  response.status(204).end()
})

module.exports = gpuRouter