import { AppDataSource } from "./data-source"
import express from "express"
import { config } from 'dotenv';
import { userRouter } from "./routes/user.router";
import { roleRouter } from "./routes/role.router";
import { productRouter } from "./routes/product.router";
import { productTypeRouter } from "./routes/productTypes.router";
import { makerRouter } from "./routes/maker.router";
import { basketRouter } from "./routes/basket.router";
import { orderRouter } from "./routes/order.routes";
config();

AppDataSource.initialize().then(async () => {
    const PORT = process.env.PORT || 8080;
    const app = express();
    app.use(express.json());
    app.use('/', userRouter)
    app.use('/', roleRouter)
    app.use('/', productRouter)
    app.use('/', productTypeRouter)
    app.use('/', makerRouter)
    app.use('/', basketRouter)
    app.use('/', orderRouter)

    const start = async () => {
        try {
            app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
        }
        catch (error){
            console.log(error)
        }
    }

    start();

}).catch(error => console.log(error))
