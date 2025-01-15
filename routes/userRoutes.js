const {Router} = require('express')
const userController = require('../controllers/userController')
const verifyToken = require('../middlewares/verifyToken')

const router = Router()

router.post("/register", userController.registerUser)
router.post('/login', userController.loginUser)
router.get('/all', verifyToken, userController.getUsers)
router.get('/logout', userController.logoutUser)
router.get('/auth', verifyToken, userController.verifyAuth)

module.exports = router