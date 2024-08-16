import React, { useEffect, useState } from 'react';
import './Problem.css'; // Import the CSS file

export const Problem = () => {
    const [problems, setProblems] = useState([]);

    const fetchAllProblems = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/problem', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setProblems(data.problems);
            console.log('response : ', data);
        } catch (error) {
            console.error('Error fetching data : ' + error);
        }
    };

    useEffect(() => {
        fetchAllProblems();
    }, []);

    return (
        <div className="problem-container">
            <h2>Problem Page</h2>
            <button type="button">Add Problem</button>
            <table className="problem-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Difficulty</th>
                    </tr>
                </thead>
                <tbody>
                    {problems.map((problem, index) => (
                        <tr key={index}>
                            <td>{problem.pno}</td>
                            <td>{problem.ptitle}</td>
                            <td>{problem.difficulty}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
