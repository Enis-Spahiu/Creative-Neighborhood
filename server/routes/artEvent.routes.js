const EventController = require('../controllers/artEvent.controllers')
const { authenticate } = require('../config/jwt.config')

module.exports = (app)=>{
    app.get('/api/getAllEvents',EventController.getAllEvents)
    app.post('/api/createEvent',authenticate, EventController.createEvent)
    app.get('/api/getEvent/:id',  EventController.getOneEvent)
    app.put('/api/editEvent/:id', EventController.editEvent)
    app.delete('/api/deleteEvent/:id', authenticate, EventController.deleteEvent)
}