import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('products_types')
export class ProductType extends BaseEntity{
    @PrimaryGeneratedColumn()
    id_type: number

    @Column("varchar")
    name_type
}