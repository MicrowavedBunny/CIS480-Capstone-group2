const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CourseSchema = new Schema({
    name: { type: String },
    code: { type: String },
    description: { type: String },
    credits: {type: Number},
    type: { type: String },
    cap: { type: Number },
    owner: {type: String}
}, {
    collection: 'courses'
});

module.exports = mongoose.model('courses', CourseSchema);
