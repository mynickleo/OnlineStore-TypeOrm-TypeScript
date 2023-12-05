import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { User } from "./User";

@Entity('roles')
export class Role extends BaseEntity{
    @PrimaryColumn()
    user_id: number

    @OneToOne(() => User,
    {onDelete: "CASCADE"})
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column('varchar')
    role: string;
}