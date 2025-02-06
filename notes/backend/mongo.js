const mongoose = require('mongoose')

const url =
  'mongodb+srv://admin:testnoteswebapp@cluster0.9gwmb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

mongoose.set('strictQuery', false)

mongoose.connect(url)
  .then(() => {
    const noteSchema = new mongoose.Schema({
      content: String,
      important: Boolean,
    })

    const Note = mongoose.model('Note', noteSchema)

    const note1 = new Note({
      content: 'HTML is x',
      important: true,
    })

    const note2 = new Note({
      content: 'Another note',
      important: false
    })

    // Use Promise.all to handle both save operations
    return Promise.all([note1.save(), note2.save()])
  })
  .then(() => {
    console.log('Notes saved!')
  })
  .finally(() => {
    mongoose.connection.close()
  })
  .catch(err => {
    console.error('Error:', err)
    mongoose.connection.close()
  })
