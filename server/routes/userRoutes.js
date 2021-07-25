const express = require('express')

const router = express.Router()

const {userController} = require('../controllers/userController')

const authorize = require('../middlewares/authorize')

router.post('/createUser', userController.createUser)

router.post('/loginUser', userController.loginUser)

router.get('/getUser', authorize, userController.getUser)



module.exports = router