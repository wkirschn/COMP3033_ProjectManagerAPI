// Import mongoose

const mongoose = require('mongoose');

// Create the schema definition object using mapping notation

const schemaDefinition = {
    name: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date
        
    },
    course: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'TO DO!'
    }

};

// Create a new schema using the definition

let schemaObject = new mongoose.Schema(schemaDefinition);

// Create a model using the schema object
// Export the model

module.exports = mongoose.model('Project', schemaObject);
