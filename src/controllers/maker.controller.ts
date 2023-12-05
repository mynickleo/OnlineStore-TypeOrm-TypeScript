import { Request, Response } from 'express';
import { IMaker } from '../interfaces/maker.interface';
import makerService from '../services/maker.service';

class MakerController{
    async getMakers(req: Request, res: Response){
        try{
            const makers = await makerService.getMakers()
            return res.json(makers)
        }
        catch(error){
            console.log(error)
            return res.status(400).json({
                message: 'Something was wrong...'
            })
        }
    }

    async createMaker(req: Request, res: Response){
        try{
            const maker: IMaker = {
                nameMaker: req.body.name_maker
            }
            const newMaker = await makerService.createMaker(maker)
            if(newMaker == null){
                return res.json("Something was wrong... Check console")
            }
            return res.json(`Maker with id: ${newMaker.id_maker} and name: ${newMaker.name_maker} has been created`)
        }
        catch(error){
            console.log(error)
            return res.status(400).json({
                message: 'Something was wrong...'
            })
        }
    }

    async changeMaker(req: Request, res: Response){
        try{
            const {idMaker, newNameMaker} = req.body
            const newMaker = await makerService.changeMaker(Number(idMaker), newNameMaker)
            return res.json(`Maker with id: ${idMaker} has been changed`)
        }
        catch(error){
            console.log(error)
            return res.status(400).json({
                message: 'Something was wrong...'
            })
        }
    }

    async deleteMaker(req: Request, res: Response){
        try{
            const {idMaker} = req.body
            await makerService.deleteMaker(Number(idMaker))
            return res.json(`Maker with id: ${idMaker} has been deleted`)
        }
        catch(error){
            console.log(error)
            return res.status(400).json({
                message: 'Something was wrong...'
            })
        }
    }
}

export default new MakerController()