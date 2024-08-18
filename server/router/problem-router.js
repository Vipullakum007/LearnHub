const express = require('express');
const router  = express.Router();
const problemController = require('../controller/problem-controller');

router.get('/', problemController.fetchAllProblems);
router.get('/:pno', problemController.fetchProblem);
router.post('/run', problemController.runProblem);
router.post('/add', problemController.addProblem);
router.delete('/delete/:id', problemController.deleteProblem);
router.post('/:pno/:uid/addsolution', problemController.addSolution);

module.exports = router;