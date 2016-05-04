var CourseDAO = require('./models/CourseDAO');
var UserDAO = require('./models/UserDAO');

module.exports = {
  configure: function(app) {
    // COURSE
    app.get('/course/', function(req, res) {
      CourseDAO.get(res);
    });

    app.post('/course/', function(req, res) {
      CourseDAO.create(req.body, res);
    });

    app.put('/course/', function(req, res) {
      CourseDAO.update(req.body, res);
    });

    app.delete('/course/:id/', function(req, res) {
      CourseDAO.delete(req.params.id, res);
    });

    // USER
    app.get('/user/', function(req, res) {
      UserDAO.get(res);
    });

    app.post('/user/', function(req, res) {
      UserDAO.create(req.body, res);
    });

    app.put('/user/', function(req, res) {
      UserDAO.update(req.body, res);
    });

    app.delete('/user/:id/', function(req, res) {
      UserDAO.delete(req.params.id, res);
    });

  }
};