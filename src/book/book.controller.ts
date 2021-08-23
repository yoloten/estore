import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import JwtAuthenticationGuard from '../authentication/guards/jwt-authentication.guard';
import { RequestWithUser } from '../authentication/interfaces/request-with-user.interface';
import { Roles } from '../user/decorators/user-roles.decorator';
import { Role } from '../user/enums/user-role.enum';
import { RolesGuard } from '../user/guards/user-roles.guard';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @Roles(Role.Admin, Role.Author)
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  async create(@Body() createBookDto: CreateBookDto) {
    return await this.bookService.create(createBookDto);
  }

  @Get()
  @UseGuards(JwtAuthenticationGuard)
  findAll() {
    return this.bookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(+id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }
}
