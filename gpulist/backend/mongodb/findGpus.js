const mongoose = require('mongoose')

const password = 'thmkirby64'
const url = 
  `mongodb+srv://rafaeltorok:${password}@gpulist0.ciotw.mongodb.net/?retryWrites=true&w=majority&appName=GpuList0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const gpuListSchema = new mongoose.Schema({
  id: Number,
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

const Gpu = mongoose.model('Gpu', gpuListSchema)

Gpu.find({}).then(result => {
  result.forEach(gpu => {
    console.log(gpu)
  })
  mongoose.connection.close()
})