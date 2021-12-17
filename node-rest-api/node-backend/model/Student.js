const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let StudentsSchema = new Schema({
    name: String,
    password: String,
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
    }
}, {
    collection: 'Students'
});

module.exports = mongoose.model('Students', StudentsSchema);