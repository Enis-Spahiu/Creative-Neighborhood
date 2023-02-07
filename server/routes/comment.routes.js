const CommentController = require('../controllers/comment.controllers')
const { authenticate } = require('../config/jwt.config')

module.exports = (app)=>{
    app.get('/api/comments',authenticate, CommentController.getAllComments)
    app.post('/api/comments',authenticate, CommentController.createComment)
    // app.get('/api/getEvent/:id',  EventController.getOneEvent)
    // app.put('/api/editEvent/:id', EventController.editEvent)
    // app.delete('/api/deleteEvent/:id', authenticate, EventController.deleteEvent)
}