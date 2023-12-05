import {Router} from 'express'
const router = Router()
import {check} from "express-validator"
import productTypesController from '../controllers/productType.controller'
import roleMiddleware from '../middlewares/roleMiddleware'

router.get('/typesprod', roleMiddleware(['ADMIN', 'USER']), productTypesController.getTypes)

router.post('/typesprod', [
    check('name_type', "Name type product cannot be empty").notEmpty(),
], roleMiddleware(['ADMIN']), productTypesController.createType)

router.put('/typesprod', [
    check('newNameType', "Name type product cannot be empty").notEmpty(),
], roleMiddleware(['ADMIN']), productTypesController.changeType)

router.delete('/typesprod', roleMiddleware(['ADMIN']), productTypesController.deleteType)

export {router as productTypeRouter}