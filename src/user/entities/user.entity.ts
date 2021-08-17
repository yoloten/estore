import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../enums/user-role.enum';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    public id?: number

    @Column({ unique: true })
    public email: string;

    @Column()
    public name: string;
   
    @Column()
    public password: string;

    @Column()
    public role: Role;
}
