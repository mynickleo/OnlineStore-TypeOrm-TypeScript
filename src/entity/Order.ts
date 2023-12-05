import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";
import { OrderDetails } from "./OrderDetails";
import { User } from "./User";

@Entity('orders')
export class Order extends BaseEntity{
    @PrimaryColumn()
    order_id: number

    @OneToOne(
        () => OrderDetails,
        {onDelete: "CASCADE"}
    )
    @JoinColumn({
        name: "order_id"
    })
    ordersDetails: OrderDetails;

    @Column("int")
    user_id: number
    @ManyToOne(
        () => User,
        {onDelete: "CASCADE"}
    )
    @JoinColumn({
        name: "user_id"
    })
    users: User
}