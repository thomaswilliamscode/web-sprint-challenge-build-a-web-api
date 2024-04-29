// add middlewares here related to actions
const Actions = require('./actions-model')
const Project = require('../projects/projects-model')

module.exports = {
	validateId, 
	validateBody,
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

async function validateBody(req, res, next) {
	// project_id
	// description up to 128 characters
	// notes
	let { 
		project_id,
		description,
		notes
	} = req.body

	if(project_id && description && notes){
		const project = await Project.getProjectActions(project_id)
		if(project.length > 0) {
			description = description.trim();
			notes = notes.trim();
			const length = description.length;
			if (length > 128) {
				res.status(400).json({
						message: 'description must be less than 128 characters long',
					});
			}
			req.info = {
				project_id: project_id,
				description: description,
				notes: notes
			}
			next()
		} else {
			res.status(404).json({message: `no project ${project_id} exists`})
		}
		
	} else {
		res.status(400).json({message: 'must include project_id, description, and notes'})
	}
}