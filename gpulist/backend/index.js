const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()

function main() {
    const requestLogger = (request, response, next) => {
        console.log('Method:', request.method)
        console.log('Path:  ', request.path)
        console.log('Body:  ', request.body)
        console.log('---')
        next()
    }

    const gpus = fetchGpuData()
    
    app.use(express.json())
    app.use(cors())
    app.use(requestLogger)
    app.use(express.static('dist'))
    
    const unknownEndpoint = (request, response) => {
        response.status(404).send({ error: 'unknown endpoint' })
    }
    
    app.get('/', (request, response) => {
        response.send('<h1>Backend is online!</h1>')
    })
    
    app.get('/api/gpus', (request, response) => {
        response.json(gpus)
    })
    
    app.get('/api/gpus/:id', (request, response) => {
        const id = Number(request.params.id)
        const gpu = gpus.find(gpu => gpu.id === id)
        if (gpu) {
            response.json(gpu)
        } else {
            console.log('x')
            response.status(404).end()
        }
    })
    
    app.use(unknownEndpoint)
    
    const PORT = process.env.PORT || 3001
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
}


function fetchGpuData() {
    const password = 'gpulistwebapp'
    const url = 
      `mongodb+srv://admin:${password}@gpulist0.ciotw.mongodb.net/?retryWrites=true&w=majority&appName=GpuList0`
    const gpuList = []

    mongoose.set('strictQuery', false)

    const serverOptions = {
        poolSize: 100,  // Set the pool size to 100 (maximum number of connections in the pool)
        socketTimeoutMS: 6000000,  // 100 minutes for socket timeout
        connectTimeoutMS: 60000,  // 60 seconds for initial connection timeout
        useNewUrlParser: true,  // Make sure to use the new connection parser
        useUnifiedTopology: true  // Use unified topology to avoid deprecation warnings
    };
    
    mongoose.connect(url, serverOptions)
      .then(() => console.log('Connected to MongoDB successfully'))
      .catch(err => console.error('Connection error:', err));

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
            gpuList.push(gpu)
        })
        mongoose.connection.close()
    })

    return gpuList
}


main()