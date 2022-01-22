import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { SchoolsEntity } from './schools.entity';

@Entity('users')
export class UsersEntity{
    @PrimaryColumn()
    id: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @Column()
    role: string;

    @ManyToOne(
        () => SchoolsEntity,
        (school) => school.users
    )
    school: SchoolsEntity

}