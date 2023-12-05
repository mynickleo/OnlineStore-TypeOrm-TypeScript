import { Request, Response } from 'express';
import orderService from '../services/order.service';
import { IOrderDetails } from '../interfaces/order.interface';

class OrderController{
    async getOrdersDetailsByUser(req: Request, res: Response){
        try{
            const idUser = req.params.id
            const ordersDetails = await orderService.getOrdersDetailsByUser(Number(idUser))
            return res.json(ordersDetails)
        }
        catch(error){
            console.log(error)
            return res.status(400).json({
                message: 'Something was wrong...'
            })
        }
    }

    async getOrdersByUser(req: Request, res: Response){
        try{
            const idUser = req.params.id
            const orders = await orderService.getOrdersByUser(Number(idUser))
            return res.json(orders)
        }
        catch(error){
            console.log(error)
            return res.status(400).json({
                message: 'Something was wrong...'
            })
        }
    }

    async createOrders(req: Request, res: Response){
        try{
            const {idUser} = req.body
            const orders = await orderService.createOrders(Number(idUser))
            if(orders != null){
                return res.json(`User's basket with id: ${idUser} doesn't exist`)
            }
            res.json(`Orders for user ${idUser} has been created`)
        }
        catch(error){
            console.log(error)
            return res.status(400).json({
                message: 'Something was wrong...'
            })
        }
    }

    async deleteOrder(req: Request, res: Response){
        try{
            const {idOrder} = req.body
            await orderService.deleteOrderById(Number(idOrder))
            return res.json(`Deletion of orders with id: ${idOrder} completed`)
        }
        catch(error){
            console.log(error)
            return res.status(400).json({
                message: 'Something was wrong...'
            })
        }
    }

    async changeProductFromOrder(req: Request, res: Response){
        try{
            const {id_order} = req.body
            const newProdOrder : IOrderDetails = {
                idProduct: req.body.id_product,
                countProduct: req.body.count_product
            }
            const changeOrder = await orderService.changeProductFromOrder(Number(id_order), newProdOrder)
            if(changeOrder == null){
                return res.json(`Order with id: ${id_order} doesn't exist`)
            }
            return res.json(changeOrder)
        }
        catch(error){
            console.log(error)
            return res.status(400).json({
                message: 'Something was wrong...'
            })
        }
    }
}

export default new OrderController()