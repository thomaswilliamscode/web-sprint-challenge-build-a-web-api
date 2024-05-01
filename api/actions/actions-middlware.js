// add middlewares here related to actions
const Actions = require('./actions-model')
const Project = require('../projects/projects-model')

module.exports = {
	validateId, 
	validateBodyPost,
	validateBodyPut
}

async function validateId(req, res, next) {
	const id = req.params.id
	const isValid = await Actions.get(id)
	if(isValid) {
		req.action = isValid
		req.id = id
		next()
	} else {
		res.status(404).json({message: `no actions with id: ${id} found`})
	}
}

async function validateBodyPost(req, res, next) {
	// project_id
	// description up to 128 characters
	// notes
	let { 
		project_id,
		description,
		notes
	} = req.body

	if(project_id && description && notes){
		next()
	} else {
		res.status(400).json({message: 'must include project_id, description, and notes'})
	}
}

async function validateBodyPut(req, res, next) {
	let { project_id, description, notes } = req.body
	if(project_id, description, notes) {
		next()
	} else {
		res
			.status(400)
			.json({ message: 'must include project_id, description, and notes' });
	}
}