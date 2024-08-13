const mongoose = require('mongoose');

const problemSetSchema = new mongoose.Schema({
    ptitle: {
        type: String,
        required: true
    },
    pid: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
        required: true
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        required: true
    },
    pstatement: {
        type: String,
        required: true
    },
    solution: {
        type: String,
        required: true
    },
    inputArray: {
        type: [String], // Array of strings to store possible inputs
        required: true
    },
    outputArray: {
        type: [String], // Array of strings to store expected outputs
        required: true
    }
}, { timestamps: true });

const ProblemSet = mongoose.model('ProblemSet', problemSetSchema);

module.exports = ProblemSet;
