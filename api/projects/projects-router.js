const Projects = require('./projects-model')
const Middle = require('./projects-middleware')

// Write your "projects" router here!
const express = require('express')

const router = express.Router()

router.get('/', async (req, res) => {
	let projects = await Projects.get()
	if(projects){
		res.status(200).json(projects)
	} else {
		res.status(200).json([])
	}
})

router.get('/:id', Middle.validateId, (req, res) => {
	res.status(200).json(req.project)

})

router.post('/', Middle.validateBody, async (req, res) => {
	// id and completed are created when project creates.
	const newProject = await Projects.insert(req.body)
	res.status(201).json(newProject)
})

router.put('/:id', Middle.validateId, Middle.validateBody, async (req, res) => {
	const updatedProject = await Projects.update(req.params.id, req.body)
	res.status(200).json(updatedProject)
})

router.delete('/:id', Middle.validateId, async(req, res) => {
	const oldProject = await Projects.remove(req.params.id)
	res.status(200).json()
})

router.get('/:id/actions', Middle.validateId, async (req, res) => {
	const actions = await Projects.getProjectActions(req.params.id)
	res.status(200).json(actions)
})






router.use( (err, req, res, next) => {
	res.status(err.status || 500).json({
		customMessage: 'something tragic happened inside the Projects Router',
		message: err.message,
		stack: err.stack
	})
})

module.exports = router