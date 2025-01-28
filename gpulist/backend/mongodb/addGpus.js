const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const url =
  `mongodb+srv://rafaeltorok:${password}@gpulist0.ciotw.mongodb.net/?retryWrites=true&w=majority&appName=GpuList0`
const gpuList = require('../db.json')

mongoose.set('strictQuery',false)

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
  memclock: Number
})

const Gpu = mongoose.model('Gpu', gpuListSchema)

// Function to save all GPUs to MongoDB
const saveAllGpus = async () => {
  try {
    const savePromises = gpuList.map(gpu => {
      const newGpu = new Gpu({
        id: gpu.id,
        manufacturer: gpu.manufacturer,
        gpuline: gpu.gpuline,
        model: gpu.model,
        cores: gpu.cores,
        tmus: gpu.tmus,
        rops: gpu.rops,
        vram: gpu.vram,
        bus: gpu.bus,
        memtype: gpu.memtype,
        baseclock: gpu.baseclock,
        boostclock: gpu.boostclock,
        memclock: gpu.memclock
      });
  
      return newGpu.save();
    });
  
    await Promise.all(savePromises);
    console.log('All GPUs saved successfully!');
  } catch (err) {
    console.error('Error saving GPUs:', err.message);
  } finally {
    mongoose.connection.close(); // Close the connection after saving
    console.log('Connection closed');
  }
};
  
// Save GPUs
saveAllGpus();