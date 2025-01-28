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

    mongoose.connect(url, {
        server: {
            socketOptions: {
                socketTimeoutMS: 0,
                connectTimeoutMS: 0
            }
        }
      })
      .then(() => {
        console.log('Connected to MongoDB');
      })
      .catch(err => {
        console.error('Error connecting to MongoDB', err);
      });
      

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