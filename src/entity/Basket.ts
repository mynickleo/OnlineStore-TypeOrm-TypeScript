import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Product } from "./Product";

@Entity('basket')
export class Basket extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

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
    @ManyToOne(
        () => Product,
        {onDelete: "CASCADE"}
    )
    @JoinColumn({
        name: "id_product"
    })
    products: Product

    @Column("int")
    count_product: number
}