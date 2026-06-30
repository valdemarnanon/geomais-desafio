const express = require('express')

const router = express.Router()

const usersController = require('../controllers/usersControllers')

router.get('/', usersController.findAll)
router.get('/:id', usersController.findById)
router.post('/', usersController.create)
router.put('/:id', usersController.update)
router.delete('/:id', usersController.remove)

module.exports = router