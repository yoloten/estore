import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { BookFormat } from '../enums/book-format.enum';
import { Book } from './book.entity';
  
  @Entity()
  export class BookFormatEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    title: BookFormat;

    @ManyToOne(() => Book, book => book.formats)
    book: Book
  }