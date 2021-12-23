const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let StudentsSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
    },
    password: { type: String }
}, {
    collection: 'Students'
});

module.exports = mongoose.model('Students', StudentsSchema);