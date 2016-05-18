var connection = require('../../connection');

function CourseDAO() {
  this.getAll = function(res) {
    connection.acquire(function(err, con) {
      con.query('select * from course', function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };

  this.getById = function(id, res) {
    connection.acquire(function(err, con) {
      con.query('select * from course where crs_id = ?', [id], function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };

  this.create = function(course, res) {
    connection.acquire(function(err, con) {
      con.query('insert into course set ?', course, function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'course creation failed'});
        } else {
          res.send({status: 0, message: 'course created successfully'});
        }
      });
    });
  };

  this.update = function(course, res) {
    connection.acquire(function(err, con) {
      con.query('update course set ? where crs_id = ?', [course, course.crs_id], function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'course update failed'});
        } else {
          res.send({status: 0, message: 'course updated successfully'});
        }
      });
    });
  };

  this.delete = function(id, res) {
    connection.acquire(function(err, con) {
      con.query('delete from course where crs_id = ?', [id], function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'Failed to delete course'});
        } else {
          res.send({status: 0, message: 'Course Deleted successfully'});
        }
      });
    });
  };
}

module.exports = new CourseDAO();
