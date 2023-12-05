import {Router} from 'express'
const router = Router()
import basketController from '../controllers/basket.controller'
import roleMiddleware from '../middlewares/roleMiddleware'

router.get('/basket/:id', roleMiddleware(['ADMIN', 'USER']), basketController.getBasketById)
router.post('/basket', roleMiddleware(['ADMIN', 'USER']), basketController.putProductToBasket)
router.delete('/basket', roleMiddleware(['ADMIN', 'USER']), basketController.deleteProductFromBasket)

export {router as basketRouter}