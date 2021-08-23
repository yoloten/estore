import { Column, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../enums/user-role.enum';
import { Exclude } from 'class-transformer';
import { Profile } from '../../profile/entities/profile.entity';
import { Book } from 'src/book/entities/book.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ unique: true })
  public email: string;

  @Column()
  public name: string;

  @Column()
  @Exclude()
  public password: string;

  @Column()
  public role: Role;

  @OneToOne(() => Profile)
  @JoinColumn()
  profile?: Profile;

  @ManyToMany(() => Book, book => book.authors)
  books?: Book[];
}
