import { Basket } from "../entity/Basket"
import { Order } from "../entity/Order"
import { OrderDetails } from "../entity/OrderDetails"
import { IOrderDetails } from "../interfaces/order.interface"

class OrderService{
    async getOrdersDetailsByUser(idUser: number){
        try{
            const ordersDetails = await OrderDetails.findBy({
                user_id: idUser
            })
            return ordersDetails
        }
        catch(error){
            console.log("Something was wrong...", error)
        }
    }

    async getOrdersByUser(idUser: number){
        try{
            const orders = await Order.findBy({
                user_id: idUser
            })
            return orders
        }
        catch(error){
            console.log("Something was wrong...", error)
        }
    }

    async createOrders(idUser: number){
        try{
            const userBasket = await Basket.findBy({
                user_id: idUser
            })
            if(userBasket.length == 0){
                return new Error("User doesn't exist")
            }
            userBasket.forEach(async (product) =>{
                const date = new Date().toISOString().slice(0, 19).replace('T', ' ')
                const productToOrderDetails = OrderDetails.create({
                    user_id: product.user_id,
                    id_product: product.id_product,
                    count_product: product.count_product,
                    created_at: date,
                    updated_at: date
                })
                await productToOrderDetails.save()
                const productToOrder = Order.create({
                    order_id: productToOrderDetails.order_id,
                    user_id: productToOrderDetails.user_id
                })
                await productToOrder.save()
                await product.remove()
            })
        }
        catch(error){
            console.log("Something was wrong...", error)
            return error
        }
    }

    async deleteOrderById(idOrder: number){
        const order = await OrderDetails.findOneBy({
            order_id: idOrder
        })
        await order.remove()
    }

    async changeProductFromOrder(idOrder: number, newProdOrder: IOrderDetails){
        try{
            const orderDetails = await OrderDetails.findOneBy({
                order_id: idOrder
            })
            if(orderDetails == null){
                return null
            }
            orderDetails.id_product = newProdOrder.idProduct
            orderDetails.count_product = newProdOrder.countProduct
            await orderDetails.save()
            return orderDetails
        }
        catch(error){
            console.log("Something was wrong...", error)
        }
    }
}

export default new OrderService()