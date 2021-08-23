import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { BookType } from '../enums/book-type.enum';
import { BookFormat } from '../enums/book-format.enum';
import { BookFormatEntity } from './book-format.entity';
import { BookTypeEntity } from './book-type.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  price: string;

  @Column({ nullable: true })
  downloadLink: string;

  @CreateDateColumn({
    type: 'timestamptz',
    default: new Date(),
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: new Date(),
  })
  updatedDate: Date;

  @OneToMany(() => BookFormatEntity, (format) => format.book)
  formats: BookFormatEntity[];

  @OneToMany(() => BookTypeEntity, (format) => format.book)
  types: BookTypeEntity[];

  @ManyToMany(() => User, user => user.books)
  @JoinTable()
  authors: User[];
}
