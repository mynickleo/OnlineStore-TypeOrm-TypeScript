import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { MakerInfo } from "./MakerInfo";
import { ProductType } from "./ProductTypes";

@Entity('products')
export class Product extends BaseEntity{
    @PrimaryGeneratedColumn()
    id_product: number

    @Column("varchar")
    name_product: string
    
    @Column("varchar")
    id_maker: number
    @ManyToOne(
        () => MakerInfo,
        {onDelete: "CASCADE"}
    )
    @JoinColumn({
        name: 'id_maker'
    })
    makerInfo: MakerInfo

    @Column("varchar")
    id_type: number
    @ManyToOne(
        () => ProductType,
        {onDelete: "CASCADE"}
    )
    @JoinColumn({
        name: 'id_type'
    })
    productTypes: ProductType

    @Column("int")
    price: number
}