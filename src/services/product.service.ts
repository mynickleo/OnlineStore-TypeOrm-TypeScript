import { Product } from "../entity/Product"
import { IProduct, IProductChange } from "../interfaces/product.interface"

class ProductService{
    async getProducts(){
        try{
            const products = await Product.find()
            return products
        }
        catch(error){
            console.log("Something was wrong...", error)
        }
    }

    async getProduct(idProduct: number){
        try{
            const product = await Product.findOneBy({
                id_product: idProduct
            })
            return product
        }
        catch(error){
            console.log("Something was wrong...", error)
        }
    }

    async createProduct(product: IProduct){
        try{
            const productExist = await Product.findOneBy({
                name_product: product.nameProduct
            })
            if(productExist){
                console.log(`Product with name: ${product.nameProduct} already exist`)
                return null
            }
            else{
                const newProduct = Product.create({
                    name_product: product.nameProduct,
                    id_maker: product.idMaker,
                    id_type: product.idType,
                    price: product.price
                })
                await newProduct.save()
                return newProduct
            }
        }
        catch(error){
            console.log("Something was wrong...", error)
        }
    }

    async changeProduct(newProduct: IProductChange){
        try{
            const product = await Product.findOneBy({
                id_product: newProduct.idProduct
            })
            if(!product){
                return null
            }
            product.name_product = newProduct.nameProduct
            product.id_maker = newProduct.idMaker
            product.id_product = newProduct.idType
            product.price = newProduct.price
            await product.save()
            return product
        }
        catch(error){
            console.log("Something was wrong...", error)
        }
    }

    async deleteProduct(idProduct: number){
        try{
            const product = await Product.findOneBy({
                id_product: idProduct
            })
            await product.remove()
        }
        catch(error){
            console.log("Something was wrong...", error)
        }
    }
}

export default new ProductService()