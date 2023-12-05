import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Basket } from "./entity/Basket"
import { MakerInfo } from "./entity/MakerInfo"
import { Order } from "./entity/Order"
import { OrderDetails } from "./entity/OrderDetails"
import { Product } from "./entity/Product"
import { ProductType } from "./entity/ProductTypes"
import { Role } from "./entity/Role"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "3742907",
    database: "onlinestoreorm",
    synchronize: true,
    logging: false,
    entities: [User, Basket, MakerInfo,
    Order, OrderDetails, Product, 
    ProductType, Role],
    migrations: [],
    subscribers: [],
})
