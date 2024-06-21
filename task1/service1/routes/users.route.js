import express from 'express'

import {
  getUsersList,
  createUser,
  updateUser
} from '../controllers/users.controller.js'
import createUserValidator from '../validators/user.validator.js'
import validateRequest from '../middlewares/validateRequest.middleware.js'

const router = express.Router()

router.post('/create', createUserValidator, validateRequest, createUser)
router.put('/update', updateUser)
router.get('/list', getUsersList)

export default router
