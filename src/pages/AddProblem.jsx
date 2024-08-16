import React, { useState } from 'react'

export const AddProblem = () => {
  const [problem, setProblem] = useState({
    pno: '',
    ptitle: '',
    difficulty: '',
    pstatement: '',
    solution: '',
    inputArray: [],
    outputArray: []
  });
  const [input, setInput] = useState([]);
  const [output, setOutput] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/problem/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  return (
    <div>
      <h2>Add Problem Page</h2>
      <form onSubmit={handleSubmit}>

        Problem Number : <input type="number" name='pno' placeholder='enter problem number ' />
        Problem Title : <input type="text" name="ptitle" id="ptitle" />
        Problem statement : <textarea rows="4" cols="50" name="pstmt" id="pstmt"></textarea>
        solution : <textarea rows={10} cols={50} name='sol' id='sol'></textarea>
        inputArray : <input type="text" name="input1" id="output1" />
        outputArray : <input type="text" name="input2" id="output2" />

        <button type="submit">Add Problem</button>
      </form>
    </div>
  )
}
