import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UsersEntity } from './users.entity';

@Entity('schools')
export class SchoolsEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    cell: string;

    @Column()
    email: string;

    @Column()
    address: string;

    @OneToMany(
        () => UsersEntity,
        (user) => user.school
    )
    users: UsersEntity[]
}