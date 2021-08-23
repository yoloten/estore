import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { BookTypeEntity } from './entities/book-type.entity';
import { BookFormat } from './enums/book-format.enum';
import { BookFormatEntity } from './entities/book-format.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, BookTypeEntity, BookFormatEntity, User])],
  controllers: [BookController],
  providers: [BookService]
})
export class BookModule {}
