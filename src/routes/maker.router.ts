import {Router} from 'express'
const router = Router()
import makerController from '../controllers/maker.controller'
import roleMiddleware from '../middlewares/roleMiddleware'

router.get('/makers', roleMiddleware(['ADMIN', 'USER']), makerController.getMakers)
router.post('/makers', roleMiddleware(['ADMIN']), makerController.createMaker)
router.put('/makers', roleMiddleware(['ADMIN']), makerController.changeMaker)
router.delete('/makers', roleMiddleware(['ADMIN']), makerController.deleteMaker)

export {router as makerRouter}