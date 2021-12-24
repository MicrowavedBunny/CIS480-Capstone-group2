const express = require('express');
const app = express();
 
const courseRoute = express.Router();
let Course = require('../model/Course');
 
// Get all Course
courseRoute.route('/').get((req, res) => {
    Course.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

//get course by owner
courseRoute.route('/read-course/:owner').get((req, res) => {
  Course.find({ "owner": req.params.owner},(error, data) => {
  if (error) {
    return next(error)
  } else {
    res.json(data)
  }
})
})

 
// Get Course
courseRoute.route('/read-course/:id').get((req, res) => {
  Course.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

//Update Course
courseRoute.route('/update-course/:id').put((req, res, next) => {
  Course.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Course updated successfully!')
    }
  })
})

//Add a course
courseRoute.route('/add-course').post((req, res, next) => {
  Course.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

//Remove a course
courseRoute.route('/remove-course/:id').delete((req, res, next) => {
  Course.findByIdAndDelete(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
      console.log('Course successfully deleted.')
    }
  })
})

module.exports = courseRoute;