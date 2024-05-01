// add middlewares here related to projects
const Projects = require('./projects-model')

module.exports = {
	validateId, 
	validateBodyPost,
	validateBodyPut

}

async function validateId(req, res, next){
	const id = req.params.id
	const project = await Projects.get(id)
	if(project) {
		req.project = project
		next()
	} else {
		res.status(404).json({message: `Project with id ${id} not found. `})
	}
}

async function validateBody(req, res, next) {
	// name string 
	// description string
	const { name, description, completed } = req.body

	if (name && description && completed) {
		if(name.trim() && description.trim()) {
			req.info = {
				name: name.trim(),
				description: description.trim()
			}
			if(completed) {
				req.info.completed = completed
			} else {
				req.info.completed = false
			}
			next()
		} 
	} else {
		res.status(400).json({message: 'name and description must be included'})
	}
}
async function validateBodyPost(req, res, next) {
	const {name, description} = req.body
	if (name && description) {
		next()
	} else {
		res.status(400).json({ message: 'name and description must be included' });
	}
}

async function validateBodyPut(req, res, next) {
	const { name, description, completed } = req.body;
	if ((name && description) && (completed === true || completed === false)) {
		next();
	} else {
		res.status(400).json({ message: 'name and description must be included' });
	}
}