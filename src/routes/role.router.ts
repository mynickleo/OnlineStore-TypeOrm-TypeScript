import {Router} from 'express'
const router = Router()
import rolesController from '../controllers/role.controller'
import roleMiddleware from '../middlewares/roleMiddleware'

router.post('/roles', roleMiddleware(['ADMIN']), rolesController.setRole)
router.get('/roles', roleMiddleware(['ADMIN']), rolesController.getRoles)
router.get('/roles/:id', roleMiddleware(['USER', 'ADMIN']), rolesController.getRole)
router.delete('/roles/:id', roleMiddleware(['ADMIN']),rolesController.deleteUserRole)

export {router as roleRouter}