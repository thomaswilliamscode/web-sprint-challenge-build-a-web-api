// Write your "actions" router here!
const express = require('express')

const Actions = require('./actions-model')
const Middle = require('./actions-middlware')

const router = express.Router()

router.get('/', async (req, res) => {
	const actions = await Actions.get()
	res.status(200).json(actions)
})

router.get('/:id', Middle.validateId, (req, res) => {
	res.status(200).json(req.action);
});

router.post('/', Middle.validateBody, async (req, res) => {
	const newAction = await Actions.insert(req.info)
	res.status(201).json(newAction)
})

router.put('/:id', Middle.validateId, Middle.validateBody, async (req, res) => {
	const updatedInfo = await Actions.update(req.id, req.body)

	res.status(201).json(updatedInfo)
})

router.delete('/:id', Middle.validateId, async (req, res) => {
	const oldAction = await Actions.remove(req.id)

	res.status(200).json()
})



router.use( (err, req, res, next) => {
	res.status(err.status || 500).json({
		customeMessage: 'something tragic inside actionsRouter',
		message: err.message,
		stack: err.stack,
	})
})


module.exports = router