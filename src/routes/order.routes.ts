import {Router} from 'express'
const router = Router()
import orderController from '../controllers/order.controller'
import roleMiddleware from '../middlewares/roleMiddleware'

router.get('/orders/:id', roleMiddleware(['ADMIN']), orderController.getOrdersByUser)
router.get('/orders_details/:id', roleMiddleware(['ADMIN']), orderController.getOrdersDetailsByUser)
router.post('/orders', roleMiddleware(['ADMIN', 'USER']), orderController.createOrders)
router.delete('/orders', roleMiddleware(['ADMIN', 'USER']), orderController.deleteOrder)
router.put('/orders', roleMiddleware(['ADMIN', 'USER']), orderController.changeProductFromOrder)

export {router as orderRouter}