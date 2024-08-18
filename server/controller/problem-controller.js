const Problem = require('../models/prolemset-model')
const Solution = require('../models/solutions-model')
const compiler = require("compilex");
const options = { stats: true }; // Optional: Enable stats
compiler.init(options);


const fetchProblem = async (req, res) => {
    try {
        const pno = req.params.pno;
        console.log(pno);
        const problem = await Problem.findOne({ pno });
        if (!problem) {
            res.status(404).json({ message: 'No problems found' });
        }
        res.status(200).json({ problem });
    } catch (error) {
        console.error(error);
    }
};


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

const runProblem = async (req, res) => {
    const code = req.body.code;
    const input = req.body.input || ''; // Default to empty string if no input provided
    const lang = req.body.language;

    console.log('code : ', code);
    console.log('lang : ', lang)
    console.log('input : ', input);

    let envData = { OS: "windows", options: { timeout: 10000 } }; // Basic environment data

    try {
        switch (lang) {
            case 'Cpp':
                envData.cmd = "g++";
                if (!input) {
                    compiler.compileCPP(envData, code, (data) => {
                        if (data.error) {
                            res.status(500).send({ output: "error", details: data.error });
                        } else {
                            res.send({ output: data.output });
                        }
                    });
                } else {
                    compiler.compileCPPWithInput(envData, code, input, (data) => {
                        if (data.error) {
                            res.status(500).send({ output: "error", details: data.error });
                        } else {
                            res.send({ output: data.output });
                        }
                    });
                }
                break;

            case 'Java':
                if (!input) {
                    compiler.compileJava(envData, code, (data) => {
                        if (data.error) {
                            res.status(500).send({ output: "error", details: data.error });
                        } else {
                            res.send({ output: data.output });
                        }
                    });
                } else {
                    compiler.compileJavaWithInput(envData, code, input, (data) => {
                        if (data.error) {
                            res.status(500).send({ output: "error", details: data.error });
                        } else {
                            res.send({ output: data.output });
                        }
                    });
                }
                break;

            case 'Python':
                if (!input) {
                    compiler.compilePython(envData, code, (data) => {
                        if (data.error) {
                            res.status(500).send({ output: "error", details: data.error });
                        } else {
                            res.send({ output: data.output });
                        }
                    });
                } else {
                    compiler.compilePythonWithInput(envData, code, input, (data) => {
                        if (data.error) {
                            res.status(500).send({ output: "error", details: data.error });
                        } else {
                            res.send({ output: data.output });
                        }
                    });
                }
                break;

            default:
                res.status(400).send({ output: "error", details: "Unsupported language" });
        }
    } catch (error) {
        console.error('Compilation error: ', error);
        res.status(500).send({ output: "error", details: "Internal server error" });
    }
};

const addSolution = async (req, res) => {
    const { problemid, userid, code, status } = req.body;
    try {
        const newSolution = new Solution({ problemid, userid, code, status });
        await newSolution.save();
        return res.status(201).json({ message: "Solution added successfully", solution: newSolution });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error in adding solution" });
    }
};


module.exports = { fetchAllProblems, addProblem, deleteProblem, fetchProblem, runProblem, addSolution };