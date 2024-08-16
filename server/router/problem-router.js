const express = require('express');
const router  = express.Router();
const problemController = require('../controller/problem-controller');

router.get('/', problemController.fetchAllProblems);
router.post('/add', problemController.addProblem);
router.delete('/delete/:id', problemController.deleteProblem);

module.exports = router;