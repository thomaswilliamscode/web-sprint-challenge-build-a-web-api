const Projects = require('./projects-model')
const Middle = require('./projects-middleware')

// Write your "projects" router here!
const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
	let projects = Projects.get()
	if(projects.length){
		res.status(200).json(projects)
	} else {
		res.status(200).json([])
	}
})






router.use( (err, req, res, next) => {
	res.status(err.status || 500).json({
		customMessage: 'something tragic happened inside the Projects Router',
		message: err.message,
		stack: err.stack
	})
})

module.exports = router