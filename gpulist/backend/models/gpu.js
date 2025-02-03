const mongoose = require('mongoose')

const gpuListSchema = new mongoose.Schema({
    manufacturer: { type: String, required: true, trim: true },
    gpuline: { type: String, required: true, trim: true },
    model: { type: String, required: true, trim: true },
    cores: { type: Number, required: true },
    tmus: { type: Number, required: true },
    rops: { type: Number, required: true },
    vram: { type: Number, required: true },
    bus: { type: Number, required: true },
    memtype: { type: String, required: true, trim: true },
    baseclock: { type: Number, required: true },
    boostclock: { type: Number, required: true },
    memclock: { type: Number, required: true },
})

gpuListSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Gpu', gpuListSchema)