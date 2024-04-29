// add middlewares here related to projects
const Projects = require('./projects-model')

module.exports = {
	validateId, 
	validateBody,

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
	const { name, description } = req.body

	if (name && description) {
		if(name.trim() && description.trim()) {
			next()
		} 
	} else {
		res.status(400).json({message: 'name and description must be included'})
	}




	
}