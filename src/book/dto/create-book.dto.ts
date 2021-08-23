import { BookType } from '../enums/book-type.enum';
import { BookFormat } from '../enums/book-format.enum';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsNumber,
  IsArray,
  ArrayMinSize,
} from 'class-validator';
import { IsArrayOfEnums } from '../../utils/decorators/is-array-of-enums.decorator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  description: string;

  @IsString()
  @IsNotEmpty()
  price: string;

  @IsArrayOfEnums(BookType, {message: "Some of the types doesn't exists in BookType enum"})
  types: BookType[];

  @IsArrayOfEnums(BookFormat, {message: "Some of the formats doesn't exists in BookFormat enum"})
  formats: BookFormat[];

  downloadLink?: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsNumber({},{each: true})
  authorsIds: number[]
}
