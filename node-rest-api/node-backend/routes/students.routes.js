const express = require('express');
const app = express();
 
const studentsRoute = express.Router();
const Student = require('../model/Student');
 
// Get all Student
studentsRoute.get('/login-page', function(req, res){
  console.log('get request for students');
    Student.find({})
    .exec(function(error, data){ 
        if (error) {
            console.log('error retreving students');
        } else {
          res.json(data);
    }
  });
});
 
//Get Student
studentsRoute.get('/login-page/:id', function(req, res){
  console.log('get request for single student');
    Student.findById(req.params.id)
    .exec(function(error, data){ 
        if (error) {
            console.log('error retreving single student');
        } else {
          res.json(data);
    }
  });
});


/*Update Student
studentsRoute.route('/update-student/:id').put((req, res, next) => {
  Student.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Student updated successfully!')
    }
  })
})
*/

//Add a student
studentsRoute.route('/register-page').post((req, res, next) => {
  Student.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

/*Remove a student
studentsRoute.route('/remove-student/:id').delete((req, res, next) => {
  Student.findByIdAndDelete(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
      console.log('Student successfully deleted.')
    }
  })
})
*/
module.exports = studentsRoute;