/* eslint-disable default-case */
import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './AddProblem.css';
export const AddProblem = () => {
  const [problem, setProblem] = useState({
    pno: '',
    ptitle: '',
    difficulty: '',
    pstatement: '',
    solution: '',
    constraints: [''],
    examples: [{ input: '', output: '', explanation: '' }],
    testCases: [{ input: '', output: '' }]
  });

  const [formData, setFormData] = useState({
    problem: [],
  });

  const [modalData, setModalData] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const handleModalSave = () => {
    handleModalClose();
  };
  const handleModalOpen = (problem) => {
    setModalData(problem);
  };

  const handleModalClose = () => {
    setModalData(null);
  };
  const addQuestion = () => {
    console.log(problem);
    setFormData((prevFormData) => ({
      ...prevFormData,
      problem: [...prevFormData.problem, problem],
    }));
    // console.log(problem);
    setProblem(
      {
        pno: '',
        ptitle: '',
        difficulty: '',
        pstatement: '',
        solution: '',
        constraints: [''],
        examples: [{ input: '', output: '', explanation: '' }],
        testCases: [{ input: '', output: '' }]
      }
    );
    setCurrentStep(1);
  };

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProblem((prevProblem) => ({
      ...prevProblem,
      [name]: value
    }));
    console.log(name, value);
  };

  const handleCodingQuestionChange = (e) => {
    const { name, value } = e.target;
    setProblem((prevProblem) => ({
      ...prevProblem,
      solution: value,
    }));
  };

  const handleTitleChange = (e) => {
    const { name, value } = e.target;
    setProblem((prevProblem) => ({
      ...prevProblem,
      ptitle: value
    }));
  }
  const handleDescChange = (value) => {
    // console.log(value);
    setProblem((prevProblem) => ({
      ...prevProblem,
      pstatement: value,
    }));
  }
  const handleConstraintChange = (index, e) => {
    const { value } = e.target;
    setProblem((prevProblem) => {
      const newConstraints = [...prevProblem.constraints];
      newConstraints[index] = value;
      return {
        ...prevProblem,
        constraints: newConstraints,
      };
    });
    // console.log(value);
  };

  const addConstraint = () => {
    setProblem((prevProblem) => ({
      ...prevProblem,
      constraints: [...prevProblem.constraints, ''],
    }));
  };

  const handleExampleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedExamples = [...problem.examples];
    updatedExamples[index] = { ...updatedExamples[index], [name]: value };
    setProblem(prevProblem => ({
      ...prevProblem,
      examples: updatedExamples
    }));
    // console.log(value);
  };

  const addExample = () => {
    setProblem(prevProblem => ({
      ...prevProblem,
      examples: [...prevProblem.examples, { input: '', output: '', explanation: '' }]
    }));
  };

  const handleTestCaseChange = (index, e) => {
    const newTestCases = [...problem.testCases];
    newTestCases[index][e.target.name] = e.target.value;
    setProblem((prevProblem) => ({
      ...prevProblem,
      testCases: newTestCases,
    }));
    console.log(e.target.value);
  };

  const addTestCase = () => {
    setProblem((prevProblem) => ({
      ...prevProblem,
      testCases: [...prevProblem.testCases, { input: '', output: '' }],
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileContent = event.target.result;
        const testCases = parseTestCases(fileContent);

        // Update the state with the parsed test cases
        setProblem((prevProblem) => ({
          ...prevProblem,
          testCases: testCases,
        }));
      };
      reader.readAsText(file);
    }
  };

  const parseTestCases = (fileContent) => {
    const lines = fileContent.split('\n');
    const testCases = [];

    let input = '';
    let output = '';

    lines.forEach((line) => {
      if (line.startsWith('input:')) {
        input = line.replace('input:', '').trim();
      } else if (line.startsWith('output:')) {
        output = line.replace('output:', '').trim();
        if (input && output) {
          testCases.push({ input, output });
          input = '';
          output = '';
        }
      }
    });
    console.log('test cases : ', testCases);
    return testCases;

  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('form data : ', formData);
    console.log(' problem : ', formData.problem[1]);
    const problemData = formData.problem[1];
    try {
      const response = await fetch("http://localhost:5000/api/problem/add", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(problemData)
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Problem added successfully:', data);
      } else {
        console.error('Error adding problem:', data.message);
      }
    } catch (error) {
      console.error('server error:', error.message);
    }
  };

  const renderStep = () => {
    switch (currentStep) {

      case 1:
        return (
          <div>
            <h3>Problem Info</h3>
            <div className="pinfo" style={{ marginTop: "20px" }}>
              <label htmlFor="pno">Problem Number </label>
              <input
                type="number"
                name="pno"
                id="pno"
                value={problem.pno}
                onChange={handleChange}
              />
              <label htmlFor="ptitle">Problem Title </label>
              <input
                type="text"
                className="ptitle"
                placeholder=" Ex: Two Sum"
                value={problem.ptitle}
                onChange={handleTitleChange}
                name="ptitle"
              />
              <label htmlFor="difficulty">Difficulty </label>
              <select
                id="difficulty"
                name="difficulty"
                value={problem.difficulty}
                onChange={(e) => setProblem({ ...problem, difficulty: e.target.value })}
                style={{ width: "100%", padding: "10px", fontSize: "1rem" }}
              >
                <option value="">Select Difficulty</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div style={{ marginTop: "20px" }}>
              <button type="button" className="nextbtn" onClick={nextStep} style={{ padding: "10px" }}>
                Next &raquo;
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div>
            <h3>Problem Description</h3>
            <ReactQuill
              value={problem.pstatement}
              onChange={handleDescChange}
              theme="snow"
              placeholder="Enter problem description"
            />
            <div style={{ marginTop: "20px" }}>
              <button type="button" className="prevbtn" onClick={prevStep} style={{ padding: "10px", marginRight: "10px" }}>
                &laquo; Previous
              </button>
              <button type="button" className="nextbtn" onClick={nextStep} style={{ padding: "10px" }}>
                Next &raquo;
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div>
            <h3>Constraints</h3>
            {problem.constraints.map((constraint, index) => (
              <div key={`constraint-${index}`} style={{ marginBottom: '5px' }}>
                <input
                  type="text"
                  value={constraint}
                  onChange={(e) => handleConstraintChange(index, e)}
                  name="constraint"
                  style={{ width: '100%', padding: '5px' }}
                />
              </div>
            ))}
            <button
              type="button"
              className="addbtn"
              onClick={addConstraint}
              style={{
                padding: '5px',
                marginTop: '10px',
              }}
            >
              Add Constraint
            </button>
            <div style={{ marginTop: '20px' }}>
              <button
                type="button"
                className="prevbtn"
                onClick={prevStep}
                style={{
                  padding: '10px',
                  marginRight: '10px',
                }}
              >
                &laquo; Previous
              </button>
              <button
                type="button"
                className="nextbtn"
                onClick={nextStep}
                style={{ padding: '10px' }}
              >
                Next &raquo;
              </button>
            </div>
          </div>
        );

      case 4:
        return (
          <div>
            <h3>Examples</h3>
            {problem.examples.map((example, index) => (
              <div key={`example-${index}`} style={{ marginBottom: "10px" }}>
                <label>Example {index + 1}:</label>
                <br />
                <label>Input:</label>
                <br />
                <input
                  type="text"
                  value={example.input}
                  onChange={(e) => handleExampleChange(index, e)}
                  name="input"
                  style={{ width: "100%", padding: "5px" }}
                />
                <br />
                <label>Output:</label>
                <br />
                <input
                  type="text"
                  value={example.output}
                  onChange={(e) => handleExampleChange(index, e)}
                  name="output"
                  style={{ width: "100%", padding: "5px" }}
                />
                <br />
                <label>Explanation:</label>
                <br />
                <textarea
                  value={example.explanation}
                  onChange={(e) => handleExampleChange(index, e)}
                  name="explanation"
                  style={{ width: "100%", padding: "5px", minHeight: "50px" }}
                />
              </div>
            ))}
            <button type="button" className="addbtn" onClick={addExample} style={{ padding: "5px", marginTop: "10px" }}>
              Add Example
            </button>
            <div style={{ marginTop: "20px" }}>
              <button type="button" className="prevbtn" onClick={prevStep} style={{ padding: "10px", marginRight: "10px" }}>
                &laquo; Previous
              </button>
              <button type="button" className="nextbtn" onClick={nextStep} style={{ padding: "10px" }}>
                Next &raquo;
              </button>
            </div>
          </div>
        );

      case 5:
        return (
          <div>
            <h3>Test Cases</h3>
            {problem.testCases.map((testCase, index) => (
              <div key={`testCase-${index}`} style={{ marginBottom: "10px" }}>
                <label>Test Case {index + 1}:</label>
                <br />
                <label>Input:</label>
                <br />
                <input
                  type="text"
                  value={testCase.input}
                  onChange={(e) => handleTestCaseChange(index, e)}
                  name="input"
                  style={{ width: "100%", padding: "5px" }}
                />
                <br />
                <label>Output:</label>
                <br />
                <input
                  type="text"
                  value={testCase.output}
                  onChange={(e) => handleTestCaseChange(index, e)}
                  name="output"
                  style={{ width: "100%", padding: "5px" }}
                />
              </div>
            ))}
            <button type="button" className="addbtn" onClick={addTestCase} style={{ padding: "5px", marginTop: "10px" }}>
              Add Test Case
            </button>
            <input
              type="file"
              className="prevbtn"
              style={{ padding: "5px", marginTop: "10px", marginLeft: "10px" }}
              onChange={handleFileUpload}
            />
            <div style={{ marginTop: "20px" }}>
              <button type="button" className="prevbtn" onClick={prevStep} style={{ padding: "10px", marginRight: "10px" }}>
                &laquo; Previous
              </button>
              <button type="button" className="nextbtn" onClick={nextStep} style={{ padding: "10px" }}>
                Next &raquo;
              </button>
            </div>
          </div>
        );

      case 6:
        return (
          <div>
            <h3>Solution</h3>
            <textarea
              value={problem.solution}
              onChange={handleCodingQuestionChange}
              name="solution"
              style={{ width: "100%", padding: "5px", minHeight: "100px" }}
            />
            <div style={{ marginTop: "20px" }}>
              <button type="button" className="prevbtn" onClick={prevStep} style={{ padding: "10px", marginRight: "10px" }}>
                &laquo; Previous
              </button>
              <button type="button" className="addbtn" onClick={addQuestion} style={{ padding: "10px" }}>
                Add Question
              </button>
            </div>
          </div>
        );

    }//switch

  };


  return (

    <div>
      <div className="step-container">
        <h2>Add Problem Page</h2>
        <form onSubmit={handleSubmit}>
          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: `${((currentStep - 1) / 5) * 100}%` }}
            ></div>
          </div>
          {renderStep()}
          <button
            type="submit"
            className="submitbtn"
            style={{ padding: "10px", marginTop: "20px" }}
          >
            Submit
          </button>
        </form>
      </div>
      {/* {modalData && (
        <div className="modal">
          <div className="modal-content">
            <h3>Question Details</h3>
            <div>
              <label>Title:</label>
              <input
                type="text"
                value={modalData.title}
                onChange={(e) => setModalData({ ...modalData, codingQuestion: { ...modalData.codingQuestion, title: e.target.value } })}
                style={{ width: "100%", padding: "5px" }}
              />
            </div>
          </div>
        </div>
      )} */}
    </div>
  )
};
