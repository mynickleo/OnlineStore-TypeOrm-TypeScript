import { Request, Response } from 'express';
import { IProductBasket } from '../interfaces/basket.interface';
import basketService from '../services/basket.service';

class BasketController{
    async putProductToBasket(req: Request, res: Response){
        try{
            const productBasket : IProductBasket = {
                userId: req.body.user_id,
                productId: req.body.product_id,
                countProduct: req.body.count_product
            }
            const putProduct = await basketService.putToBasket(productBasket)
            if(putProduct == null){
                return res.json(`Something was wrong... Check console`)
            }
            return res.json(`Products has been put in Basket`)
        }
        catch(error){
            console.log(error)
            return res.status(400).json({
                message: 'Something was wrong...'
            })
        }
    }

    async deleteProductFromBasket(req: Request, res: Response){
        try{
            const {idUser, idProduct} = req.body
            const deleteProd = await basketService.deleteFromBasket(Number(idUser), Number(idProduct))
            if(deleteProd != null){
                return res.json("Something was wrong... Check console")
            }
            return res.json(`Product with id: ${idProduct} has been deleted from User's Basket with id: ${idUser}`)
        }
        catch(error){
            console.log(error)
            return res.status(400).json({
                message: 'Something was wrong...'
            })
        }
    }

    async getBasketById(req: Request, res: Response){
        try{
            const idUser = req.params.id
            const userBasket = await basketService.getBasketById(Number(idUser))
            return res.json(userBasket)
        }
        catch(error){
            console.log(error)
            return res.status(400).json({
                message: 'Something was wrong...'
            })
        }
    }
}

export default new BasketController()