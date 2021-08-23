import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { BookType } from '../enums/book-type.enum';
import { Book } from './book.entity';
  
  @Entity()
  export class BookTypeEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    title: BookType;

    @ManyToOne(() => Book, book => book.types)
    book: Book
  }