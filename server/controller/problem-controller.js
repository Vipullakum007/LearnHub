const Problem = require('../models/prolemset-model')

const fetchAllProblems = async (req, res) => {
    try {
        const problems = await Problem.find({});
        if (!problems || problems == null) {
            res.status(404).json({ message: 'No problems found' });
        }
        res.status(200).json({ problems: problems });
    } catch (error) {
        console.error(error);
    }
}

const addProblem = async (req, res) => {
    try {
        const { pno, ptitle, difficulty, pstatement, constraints, examples, testCases, solution } = req.body;

        const existProblem = await Problem.findOne({ ptitle });
        if (existProblem) {
            return res.status(400).json({ message: "Problem already exists" });
        }
        // const sanitizedSolution = solution.replace(/\n/g, '\\n').replace(/\r/g, '\\r');

        const newProblem = new Problem({
            pno,
            ptitle,
            difficulty,
            pstatement,
            constraints,
            examples,
            testCases,
            solution,
        });

        await newProblem.save();

        res.status(201).json({ message: "Problem added successfully", problem: newProblem });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

/*
const addProblem = async (req, res) => {
    try {
        const { pno, ptitle, difficulty, pstatement, solution, inputArray, outputArray } = req.body;

        const existProblem = await Problem.findOne({ ptitle });
        if (existProblem) {
            return res.status(400).json({ message: "Problem already exist" });
        }

        const newProblem = new Problem({ pno, ptitle, difficulty, pstatement, solution, inputArray, outputArray });

        await newProblem.save();

        res.status(201).json({ message: "Problem added Sucessfully", problem: newProblem });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}
*/
const deleteProblem = async (req, res) => {
    try {
        const id = req.params.id;
        const problem = await Problem.findByIdAndDelete(id);
        if (!problem) {
            return res.status(404).json({ message: 'Problem not found' });
        }
        res.status(200).json({ message: 'Problem deleted' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

module.exports = { fetchAllProblems, addProblem, deleteProblem }