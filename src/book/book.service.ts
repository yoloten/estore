import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Role } from 'src/user/enums/user-role.enum';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookFormatEntity } from './entities/book-format.entity';
import { BookTypeEntity } from './entities/book-type.entity';
import { Book } from './entities/book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    @InjectRepository(BookTypeEntity)
    private typeRepository: Repository<BookTypeEntity>,
    @InjectRepository(BookFormatEntity)
    private formatRepository: Repository<BookFormatEntity>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createBookDto: CreateBookDto) {
    const { types, formats, authorsIds, ...book } = createBookDto;
    const authors = await this.checkAuthors(authorsIds)
    const newBook = await this.bookRepository.create(book);
    const mappedTypes = types.map(t => ({title: t}))
    const mappedFormats = formats.map(f => ({title: f}))
    const createdTypes = await this.typeRepository.create(mappedTypes);
    const createdFormats = await this.formatRepository.create(mappedFormats);

    newBook.types = createdTypes
    newBook.formats = createdFormats
    newBook.authors = authors

    await this.bookRepository.save(newBook)

    return newBook;
  }

  findAll() {
    return `This action returns all book`;
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }

  async checkAuthors(authorsIds: number[]) {
    const authors = await this.userRepository.findByIds(authorsIds, {role: Role.Author})

    if (!authors.length) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Wrong Authors Provided',
          code: 'WRONG_AUTHORS',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (authors.length !== authorsIds.length) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Not All of the users are authors',
          code: 'NOT_ALL_AUTHORS',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return authors
  }
}
