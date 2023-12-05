import { ProductType } from "../entity/ProductTypes"
import { IProductType } from "../interfaces/productType.interface"

class ProductTypeService{
    async getTypes(){
        try{
            const productTypes = await ProductType.find()
            return productTypes
        }
        catch(error){
            console.log("Something was wrong...", error)
        }
    }

    async createType(productType: IProductType){
        try{
            const productExist = await ProductType.findOneBy({
                name_type: productType.nameType
            })
            if(productExist){
                console.log(`Product with name: ${productType.nameType} already exist`)
                return null
            }
            const newType = ProductType.create({
                name_type: productType.nameType
            })
            await newType.save()
            return newType
        }
        catch(error){
            console.log("Something was wrong...", error)
        }
    }

    async changeType(idType: number, newTypeName: string){
        try{
            const productType = await ProductType.findOneBy({
                id_type: idType
            })
            if(productType == null){
                console.log(`Product with name: ${newTypeName} already exist`)
                return null
            }
            productType.name_type = newTypeName
            await productType.save()
            return productType
        }
        catch(error){
            console.log("Something was wrong...", error)
        }
    }

    async deleteType(idType: number){
        try{
            const productType = await ProductType.findOneBy({
                id_type: idType
            })
            await productType.remove()
        }
        catch(error){
            console.log("Something was wrong...", error)
        }
    }
}

export default new ProductTypeService()