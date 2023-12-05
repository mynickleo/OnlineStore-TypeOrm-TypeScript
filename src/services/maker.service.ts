import { MakerInfo } from "../entity/MakerInfo"
import { IMaker } from "../interfaces/maker.interface"

class MakerService{
    async createMaker(maker: IMaker){
        try{
            const makerExist = await MakerInfo.findOneBy({
                name_maker: maker.nameMaker
            })
            if(makerExist){
                console.log(`Maker with name: ${maker.nameMaker} already exist`)
                return null
            }
            else{
                const makerInfo = MakerInfo.create({
                    name_maker: maker.nameMaker
                })
                await makerInfo.save()
                return makerInfo
            }
        }
        catch(error){
            console.log("Something was wrong...", error)
        }
    }

    async changeMaker(idMaker: number, newNameMaker: string){
        try{
            const makerInfo = await MakerInfo.findOneBy({
                id_maker: idMaker
            })
            makerInfo.name_maker = newNameMaker
            await makerInfo.save()
            return makerInfo
        }
        catch(error){
            console.log("Something was wrong...", error)
        }
    }

    async deleteMaker(idMaker: number){
        try{
            const makerInfo = await MakerInfo.findOneBy({
                id_maker: idMaker
            })
            await MakerInfo.remove(makerInfo)
        }
        catch(error){
            console.log("Something was wrong...", error)
        }
    }

    async getMakers(){
        try{
            const makers = await MakerInfo.find()
            return makers
        }
        catch(error){
            console.log("Something was wrong...", error)
        }
    }

    async getMaker(idMaker: number){
        try{
            const maker = await MakerInfo.findOneBy({
                id_maker: idMaker
            })
            return maker
        }
        catch(error){
            console.log("Something was wrong...", error)
        }
    }
}

export default new MakerService()