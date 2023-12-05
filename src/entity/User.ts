import { Entity, PrimaryGeneratedColumn, Column, OneToOne, BaseEntity } from "typeorm"

@Entity('users')
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    user_id: number

    @Column("varchar")
    firstname: string

    @Column("varchar")
    surname: string

    @Column("varchar")
    email: string

    @Column("varchar")
    password: string
}
