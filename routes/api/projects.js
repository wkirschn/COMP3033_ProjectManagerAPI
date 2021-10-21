// Router that handles the requests to /api/projects
// NEW CHANGE
const express = require('express');
const router = express.Router();

// Import the model

const Project = require('../../models/project');




// Configure the router by adding handlers
// GET handler for /api/projects
// Goal is to return a list of projects

router.get('/',(req, res, next) => {


    // web app >> res.render('view', data);
    // web api should return JSON

    //res.json('success');
    Project.find((err, projects) => {
        if (err) {
            console.log(err);
            res.json('Error!').status(500);
        }
        else {
            res.json(projects).status(200);
        }
    })


});


// Implementing the POST method
// How:             Create new projects
// Endpoint:        /projects
// Paramaters:      Project info in request body as JSON
// Method:          POST
// Description:     Inserts the given project to the db
// Status Codes:    200: Success; 500: Error

router.post('/', (req, res, next) => {

    // Create a product

    // console.log(req.body);
    // res.json(req.body).status(200);


    // Project info to be added to the DB

    if (!req.body.name) {
        res.json({'ValidationError' : 'Name is a required field!'}).status(400);
    }
    else if (!req.body.course) {
        res.json({'ValidationError' : 'Course is a required field!'}).status(400);
    }

    else if (!req.body.dueDate) {
        res.json({'ValidationError': 'Due Date is a required field!'}).status(400);
    }

else {

    Project.create({

        name: req.body.name,
        dueDate: req.body.dueDate,
        course: req.body.course


    }, (err, newProject) => {

        if (err) {
            console.log(err);
            res.json({'ErrorMessage':'Server threw exception'}).status(500);
        }
        else {
            res.json(newProject).statusCode(200);
        }
    })
        // Callback function to handle creating a new project
}

});


// Implementing the PUT method
// How:             Update a project
// Endpoint:        /projects/:_id
// Paramaters:      _id: project id to be updated, project object in request body
// Method:          PUT
// Description:     Updates the given project in the db
// Status Codes:    200: Success; 500: Error

// PUT /projects/:_id
router.put('/:_id', (req, res, next) => {
    // Validate required fields
    if (!req.body.name) {
        res.json({ 'ValidationError': 'Name is a required field' }).status(400);
    }
    else if (!req.body.course) {
        res.json({ 'ValidationError': 'Course is a required field' }).status(400);
    }

    else if (!req.body.dueDate) {
        res.json({'ValidationError': 'Due Date is a required field!'}).status(400);
    }

    else {
        Project.findOneAndUpdate(
            { _id: req.params._id }, // filter query
            {
                name: req.body.name,
                dueDate: req.body.dueDate,
                course: req.body.course,
                status: req.body.status
                
            }, // update document
            (err, updatedProject) => {
                if (err) {
                    console.log(err);
                    res.json({ 'ErrorMessage': 'Server threw an exception' }).status(500);
                }
                else {
                    console.log(updatedProject);
                    res.json(updatedProject).status(200);
                }
            } // update callback 
        );
    }
});

router.delete('/:_id', (req, res, next) => {
    Project.remove(
        {
            _id: req.params._id
        },
        (err) => {
            if (err) {
                console.log(err);
                res.json({'ErrorMessage': 'Server threw exception'}).status(500);
            }
            else {
                res.json({'success':'true'}).status(200);
            }
        }

);
});




// Export the router so it can be configured in app.js

module.exports = router;
