require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const Gpu = require('./models/gpu')

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

let gpus = []

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
    Gpu.find({}).then(gpus => {
        response.json(gpus)
    })
})

app.get('/api/gpus/:id', (request, response) => {
    Gpu.findById(request.params.id).then(gpu => {
        response.json(gpu)
    })
})
    
app.post('/api/gpus', (request, response) => {
    try {
        const body = request.body
    
        const newGpu = new Gpu ({
            manufacturer: body.manufacturer,
            gpuline: body.gpuline,
            model: body.model,
            cores: body.cores,
            tmus: body.tmus,
            rops: body.rops,
            vram: body.vram,
            bus: body.bus,
            memtype: body.memtype,
            baseclock: body.baseclock,
            boostclock: body.boostclock,
            memclock: body.memclock
        })
    
        newGpu.save().then(savedObject => {
            response.json(savedObject)
        })
    } catch (error) {
        response.status(500).json({ error: "Failed to save GPU", details: error.message });
    }
})

app.delete('/api/gpus/:id', (request, response) => {
    const { id } = request.params;

    // Use Mongoose's findByIdAndDelete to delete the GPU by ID from the database
    Gpu.findByIdAndDelete(id)
        .then(result => {
            if (result) {
                response.status(204).end();  // Successfully deleted
            } else {
                response.status(404).json({ error: "GPU not found" });  // GPU not found
            }
        })
        .catch(error => {
            response.status(500).json({ error: "Failed to delete GPU", details: error.message });
        });
});

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})