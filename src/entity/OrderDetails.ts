import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";
import { Product } from "./Product";

@Entity('orders_details')
export class OrderDetails extends BaseEntity{
    @PrimaryGeneratedColumn()
    order_id: number

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

    @Column("int")
    id_product: number
    @OneToOne(
        () => Product,
        {onDelete: "CASCADE"}
    )
    @JoinColumn({
        name: "id_product"
    })
    products: Product

    @Column("int")
    count_product: number

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}