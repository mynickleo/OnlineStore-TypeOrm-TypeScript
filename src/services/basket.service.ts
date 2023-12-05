import { Basket } from "../entity/Basket";
import { Product } from "../entity/Product";
import {IProductBasket } from "../interfaces/basket.interface";

class BasketService{
    async putToBasket(productBasket: IProductBasket){
        try{
            const productExist = await Product.findOneBy({
                id_product: productBasket.productId
            })
            if(productExist == null){
                console.log(`Product with id: ${productBasket.productId} doesn't exist`)
                return null
            }
            const productInBasketExist = await Basket.findOneBy({
                user_id: productBasket.userId,
                id_product: productBasket.productId
            })
            if(productInBasketExist != null){
                productInBasketExist.count_product = productInBasketExist.count_product + 1
                await productInBasketExist.save()
                return productInBasketExist
            }
            else{
                const putProduct = Basket.create({
                    user_id: productBasket.userId,
                    id_product: productBasket.productId,
                    count_product: productBasket.countProduct
                })
                await putProduct.save()
                return putProduct
            }
        }
        catch(error){
            console.log("Something was wrong...", error)
        }
    }

    async deleteFromBasket(idUser: number, idProduct: number){
        try{
            const deleteProduct = await Basket.findOneBy({
                user_id: idUser,
                id_product: idProduct
            })
            if(deleteProduct == null){
                console.log("User or product doesn't exists...")
                return new Error("Error...")
            }
            await deleteProduct.remove()
        }
        catch(error){
            console.log("Something was wrong...", error)
        }
    }

    async getBasketById(idUser: number){
        try{
            const basketUser = await Basket.findBy({
                user_id: idUser
            })
            return basketUser
        }
        catch(error){
            console.log("Something was wrong...", error)
        }
    }
    
}

export default new BasketService()