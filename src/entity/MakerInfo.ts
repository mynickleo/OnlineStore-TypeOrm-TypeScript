import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('maker_info')
export class MakerInfo extends BaseEntity{
    @PrimaryGeneratedColumn()
    id_maker: number

    @Column("varchar")
    name_maker: string
}