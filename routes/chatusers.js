import express from 'express'
import userController from '../controllers/users.controller'

const router = express.Router()

router.get('/all', (req, res) => {
  userController.getAll(req, res)
})

router.get('/:id', (req, res) => {
  userController.getByID(req.params.id, res)
})

module.exports = router
