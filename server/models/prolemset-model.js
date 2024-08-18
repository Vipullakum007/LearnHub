const mongoose = require('mongoose');

const problemSetSchema = new mongoose.Schema({
    pid: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
        required: true,
        unique: true,
    },
    pno: {
        type: Number,
        required: true,
        unique: true,
        index: true, // for efficient searching and sorting
    },
    ptitle: {
        type: String,
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
    examples: [
        {
            input: {
                type: String,
                required: true,
            },
            output: {
                type: String,
                required: true
            },
            explanation: {
                type: String,
                required: true
            }
        }
    ],
    constraints: {
        type: [String],
        default: []
    },
    solution: {
        type: String,
        required: true
    },
    testCases: [
        {
            input: {
                type: String,
                required: true,
            },
            output: {
                type: String,
                required: true
            }
        }
    ],
});

const ProblemSet = mongoose.model('ProblemSet', problemSetSchema);

module.exports = ProblemSet;
