const mongoose = require('mongoose')
require('dotenv').config()

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const gpuListSchema = new mongoose.Schema({
    manufacturer: String,
    gpuline: String,
    model: String,
    cores: Number,
    tmus: Number,
    rops: Number,
    vram: Number,
    bus: Number,
    memtype: String,
    baseclock: Number,
    boostclock: Number,
    memclock: Number,
})

gpuListSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Gpu', gpuListSchema)