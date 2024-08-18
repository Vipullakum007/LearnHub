import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProblemDetail.css'; // CSS file for styling
import MonacoEditor from '@monaco-editor/react';

export const Solver = () => {
    const { pno } = useParams();
    const [problem, setProblem] = useState(null);
    const [code, setCode] = useState('// Write your code here');
    const [testCaseResults, setTestCaseResults] = useState([]);
    const [lang, setLang] = useState('Cpp');
    const [hasRunTests, setHasRunTests] = useState(false);
    const [activeTab, setActiveTab] = useState('description');
    const [solution, setSolution] = useState(null);
    const [problemResult, setProblemResult] = useState('');
    const [solutionOfUser, setSolutionOfUser] = useState({
        pid: '',
        uid: '',
        code: '',
        status: ''
    });
    const handleEditorChange = (value) => {
        setCode(value);
    };

    const runTestCases = async (e) => {
        e.preventDefault();

        console.log("Running test cases with code: ", code);

        try {
            // Example: Iterate over multiple test cases if 'problem.testCases' is an array
            const testCaseResults = [];

            for (let testCase of problem.testCases) {
                const response = await fetch('http://localhost:5000/api/problem/run', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        code,
                        language: lang,
                        input: testCase.input
                    }),
                });

                const result = await response.json();
                console.log('result : ', result);
                if (response.ok) {
                    testCaseResults.push({
                        input: testCase.input,
                        expectedOutput: testCase.output,
                        actualOutput: result.output,
                        passed: result.output.trim() === testCase.output.trim()
                    });
                } else {
                    console.error('Error in execution:', result.error);
                    testCaseResults.push({
                        input: testCase.input,
                        expectedOutput: testCase.expectedOutput,
                        actualOutput: 'Error occurred',
                        error: result.error,
                        passed: false
                    });
                    setProblemResult('Failed');
                    return;
                }
            }

            setTestCaseResults(testCaseResults);
            setHasRunTests(true);
            setProblemResult('Passed');
            console.log("Execution results: ", testCaseResults);


        } catch (error) {
            console.error('Error running code: ', error);

            // Optional: Display error message to the user
        }
    };

    useEffect(() => {
        const fetchProblemDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/problem/${pno}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                setProblem(data.problem);
                console.log('response : ', data);
                setSolution(data.problem.solution);
            } catch (error) {
                console.error('Error fetching problem details : ' + error);
            }
        };

        fetchProblemDetails();
    }, [pno]);

    const user_id = localStorage.getItem('userid');

    useEffect(() => {
        setSolutionOfUser( {
            pid: pno,
            uid: user_id,
            code: JSON.stringify(code),
            status: problemResult
        });
        console.log('solution : ', solutionOfUser);

    }, [problemResult]);

    const addSolution = async () => {
        console.log('solution: ', solutionOfUser);
        const response = await fetch(`http://localhost:5000/api/problem/${pno}/${user_id}/addsolution`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(solution)
        });
        if (!response.ok) {
            console.error('Error adding solution:', response.statusText);
        }
    }
    if (!problem) {
        return <div>Loading...</div>;
    }

    return (
        <div className="problem-detail-container">

            {/* <div className="left-container">

                <div className="problem-details">
                    <h1><span>{problem.pno} . </span>{problem.ptitle}</h1>
                    <p><strong>Description:</strong> {problem.pstatement}</p>
                    <p><strong>Difficulty:</strong> {problem.difficulty}</p>
                    <hr />

                    <p><strong>Examples:</strong></p>
                    {problem.examples.map((example, index) => (
                        <div key={index}>
                            <p><strong>Input:</strong> {example.input}</p>
                            <p><strong>Output:</strong> {example.output}</p>
                            <p><strong>Explanation:</strong> {example.explanation}</p>
                            <br />
                        </div>
                    ))}
                    <hr />
                    <p><strong>Constraints:</strong></p>
                    <ul>
                        {problem.constraints.map((constraint, index) => (
                            <li key={index}>{constraint}</li>
                        ))}
                    </ul>
                </div>
            </div> */}

            <div className="left-container">
                <div className="tab-navigation">
                    <button onClick={() => setActiveTab('description')} className={activeTab === 'description' ? 'active-tab' : ''}>
                        📝 Description
                    </button>
                    <button onClick={() => setActiveTab('solution')} className={activeTab === 'solution' ? 'active-tab' : ''}>
                        🧪 Solutions
                    </button>
                </div>

                {activeTab === 'description' && (
                    <div className="problem-details">
                        <h1><span>{problem.pno} . </span>{problem.ptitle}</h1>
                        <p><strong>Description:</strong>
                            <div dangerouslySetInnerHTML={{ __html: problem.pstatement }} />
                        </p>
                        <p><strong>Difficulty:</strong> {problem.difficulty}</p>
                        <hr />

                        <p><strong>Examples:</strong></p>
                        {problem.examples.map((example, index) => (
                            <div key={index}>
                                <p><strong>Input:</strong> {example.input}</p>
                                <p><strong>Output:</strong> {example.output}</p>
                                <p><strong>Explanation:</strong> {example.explanation}</p>
                                <br />
                            </div>
                        ))}
                        <hr />
                        <p><strong>Constraints:</strong></p>
                        <ul>
                            {problem.constraints.map((constraint, index) => (
                                <li key={index}>{constraint}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {activeTab === 'solution' && (
                    <div className="solution-details">

                        {solution ? (
                            <div>
                                <pre>{solution}</pre>
                                {/* <p><strong>Explanation:</strong> {solution.explanation}</p> */}
                            </div>
                        ) : (
                            <p>Solution not found in the database.</p>
                        )}
                    </div>
                )}
            </div>
            <div className="right-container">
                <div className="code-editor">
                    {/* dropdownlist for select language */}
                    <select value={lang} onChange={(e) => setLang(e.target.value)}>
                        <option value="Cpp">C++</option>
                        <option value="Java">Java</option>
                        <option value="Python">Python</option>
                    </select>
                    {/* problem status */}
                    <p>Status: {problemResult}</p>
                    <MonacoEditor
                        height="400px"
                        language="cpp"
                        theme="vs-dark"
                        value={code}
                        onChange={handleEditorChange}
                    />
                </div>
                <div className="test-cases">
                    <button onClick={runTestCases}>Run Test Cases</button>
                    <button onClick={addSolution}>Submit Code</button>

                    {!hasRunTests ? (
                        <div>
                            <h3>Test Cases</h3>
                            {problem.testCases.map((testCase, index) => (
                                <div key={index}>
                                    <p>Test Case {index + 1}:</p>
                                    <p>Input: {testCase.input}</p>
                                    <p>Expected Output: {testCase.output}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <>
                            <h3>Test Case Results</h3>
                            <div className='testcase-results'>
                                {testCaseResults.map((result, index) => (
                                    <div key={index}>
                                        <p>Test Case {index + 1}:</p>
                                        <p>Input: {result.input}</p>
                                        <p>Expected Output: {result.expectedOutput}</p>
                                        <p>Actual Output: {result.actualOutput}</p>
                                        <p>Result: {result.passed ?
                                            <strong className='resultPassed'>Passed</strong> :
                                            <strong className='resultFailed'>Failed</strong>
                                        }</p>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
