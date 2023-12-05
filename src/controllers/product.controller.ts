import { Request, Response } from 'express';
import productService from '../services/product.service';
import { IProduct, IProductChange } from '../interfaces/product.interface';
import { validationResult } from 'express-validator';
class ProductController{
    async getProducts(req: Request, res: Response){
        try{
            const products = await productService.getProducts()
            return res.json(products)
        }
        catch(error){
            console.log(error)
            return res.status(400).json({
                message: 'Something was wrong...'
            })
        }
    }

    async getProduct(req: Request, res: Response){
        try{
            const {idProduct} = req.body
            const product = await productService.getProduct(Number(idProduct))
            return res.json(product)
        }
        catch(error){
            console.log(error)
            return res.status(400).json({
                message: 'Something was wrong...'
            })
        }
    }

    async createProduct(req: Request, res: Response){
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({
                    message: "Errors creation", errors
                })
            }
            const newProduct: IProduct = {
                nameProduct: req.body.name_product,
                idMaker: req.body.id_maker,
                idType: req.body.id_type,
                price: req.body.price
            }
            const product = await productService.createProduct(newProduct)
            if(product == null){
                return res.json("Something was wrong... Check console")
            }
            return res.json(`Product with id: ${product.id_product} has been created`)
        }
        catch(error){
            console.log(error)
            return res.status(400).json({
                message: 'Something was wrong...'
            })
        }
    }

    async changeProduct(req: Request, res: Response){
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({
                    message: "Errors changing", errors
                })
            }
            const newProduct: IProductChange = {
                idProduct: req.body.id_product,
                nameProduct: req.body.name_product,
                idMaker: req.body.id_maker,
                idType: req.body.id_type,
                price: req.body.price
            }
            const product = await productService.changeProduct(newProduct)
            if(product == null){
                res.json(`Product with id: ${newProduct.idProduct} doesn't exist`)
            }
            return res.json(product)
        }
        catch(error){
            console.log(error)
            return res.status(400).json({
                message: 'Something was wrong...'
            })
        }
    }

    async deleteProduct(req: Request, res: Response){
        try{
            const {idProduct} = req.body
            await productService.deleteProduct(Number(idProduct))
            return res.json(`Product with id: ${idProduct} has been deleted`)
        }
        catch(error){
            console.log(error)
            return res.status(400).json({
                message: 'Something was wrong...'
            })
        }
    }
}

export default new ProductController()