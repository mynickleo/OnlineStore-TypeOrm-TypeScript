import { Request, Response } from 'express';
import { IProductType } from '../interfaces/productType.interface';
import productTypeService from '../services/productType.service';
import { validationResult } from 'express-validator';

class ProductTypesController{
    async getTypes(req: Request, res: Response){
        try{
            const productTypes = productTypeService.getTypes()
            return res.json(productTypes)
        }
        catch(error){
            console.log(error)
            return res.status(400).json({
                message: 'Something was wrong...'
            })
        }
    }

    async createType(req: Request, res: Response){
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({
                    message: "Errors creation", errors
                })
            }
            const productType: IProductType = {
                nameType: req.body.name_type
            }
            const newProductType = await productTypeService.createType(productType)
            if(newProductType == null){
                return res.json("Something was wrong... Check console")
            }
            return res.json("New product type has been created")
        }
        catch(error){
            console.log(error)
            return res.status(400).json({
                message: 'Something was wrong...'
            })
        }
    }

    async changeType(req: Request, res: Response){
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({
                    message: "Errors changing", errors
                })
            }
            const {idType, newNameType} = req.body
            const productType = await productTypeService.changeType(Number(idType), newNameType)
            if(productType == null){
                return res.json(`Product with id: ${idType} doesn't exist`)
            }
            return res.json(`Product type with id: ${idType} has been changed`)
        }
        catch(error){
            console.log(error)
            return res.status(400).json({
                message: 'Something was wrong...'
            })
        }
    }

    async deleteType(req: Request, res: Response){
        try{
            const {idType} = req.body
            await productTypeService.deleteType(Number(idType))
            return res.json(`Product type with id: ${idType} has been deleted`)
        }
        catch(error){
            console.log(error)
            return res.status(400).json({
                message: 'Something was wrong...'
            })
        }
    }
}

export default new ProductTypesController()