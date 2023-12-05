import {Router} from "express"
const router = Router()
import {check} from "express-validator"
import roleMiddleware from "../middlewares/roleMiddleware"
import userController from "../controllers/user.controller"

router.post('/register', [
    check('email', "Email cannot be empty").notEmpty(),
    check('password', "Password length need to be longer than 4 symbols").isLength({min: 4})
], userController.registerUser)
router.post('/login', userController.loginUser)
router.get('/users', roleMiddleware(['ADMIN']), userController.getUsers)
router.get('/users/:id', roleMiddleware(["ADMIN", "USER"]), userController.getUserById)
router.delete("/users", roleMiddleware(["ADMIN"]), userController.deleteUser)

export {router as userRouter}