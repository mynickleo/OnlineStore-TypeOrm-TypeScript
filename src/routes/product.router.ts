import {Router} from 'express'
const router = Router()
import {check} from "express-validator"
import productController from '../controllers/product.controller'
import roleMiddleware from '../middlewares/roleMiddleware'

router.get('/products', roleMiddleware(['ADMIN', 'USER']), productController.getProducts)
router.get('/products/:id', roleMiddleware(['ADMIN', 'USER']), productController.getProduct)

router.post('/products', [
    check('name_product', "Name product cannot be empty").notEmpty(),
    check('id_maker', "Maker product cannot be empty").notEmpty(),
    check('id_type', "Type product cannot be empty").notEmpty(),
    check('price', "Price product cannot be empty").notEmpty(),
], roleMiddleware(['ADMIN']), productController.createProduct)

router.put('/products', [
    check('id_product', "Name product cannot be empty").notEmpty(),
    check('name_product', "Name product cannot be empty").notEmpty(),
    check('id_maker', "Maker product cannot be empty").notEmpty(),
    check('id_type', "Type product cannot be empty").notEmpty(),
    check('price', "Price product cannot be empty").notEmpty(),
], roleMiddleware(['ADMIN']), productController.changeProduct)

router.delete('/products', roleMiddleware(['ADMIN']), productController.deleteProduct)

export {router as productRouter}