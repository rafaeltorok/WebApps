const contactsRouter = require('express').Router()
const Contact = require('../models/contact')

contactsRouter.get('/', (request, response) => {
  Contact.find({}).then(contacts => {
    response.json(contacts)
  })
})

// /info page
// This route must come before any /:id ones to prevent conflicts, 
// otherwise Express threats the word info as an invalid id
contactsRouter.get('/info', (request, response) => {
    Contact.countDocuments({})
      .then(count => {
        let suffix = count === 1 ? "contact" : "contacts";
        const now = new Date();
          
        response.send(`
            PhoneBook has info for ${count} ${suffix}
            <br />
            ${now.toString()}
        `);
    })
    .catch(error => {
        response.status(500).json({ error: 'Failed to fetch contacts count' });
    });
})

contactsRouter.get('/:id', (request, response, next) => {
  Contact.findById(request.params.id)
    .then(contact => {
      if (contact) {
        response.json(contact)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

contactsRouter.post('/', async (request, response, next) => {
  const body = request.body

  // Validate input fields
  const name = body.name?.trim();
  const number = body.number?.trim();

  if (!name || !number) {
    return response.status(400).json({ 
      error: 'Missing required person data'
    });
  }

  // Fetch all persons (or use findOne for efficiency)
  const existingContact = await Contact.findOne({ name });

  if (existingContact && existingContact.number === number) {
    return response.status(409).json({ 
      error: 'Contact has already been added to the PhoneBook'
    });
  }

  // Create a new person object
  const newContact = new Contact ({
    name,
    number
  });

  newContact.save()
    .then(savedContact => {
      response.json(savedContact)
    })
    .catch(error => next(error))
})

contactsRouter.delete('/:id', (request, response, next) => {
  Contact.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

// Updates an existing contact's phone number
contactsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  Contact.findByIdAndUpdate(
    request.params.id,
    { number: body.number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedContact => {
      response.json(updatedContact)
    })
    .catch(error => next(error))
})

module.exports = contactsRouter