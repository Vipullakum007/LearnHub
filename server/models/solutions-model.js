const mongoose = require('mongoose');

const solutionSchema = new mongoose.Schema({
    problemid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProblemSet',
        required: true
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    code: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Solution = mongoose.model('Solution', solutionSchema);

module.exports = Solution;
