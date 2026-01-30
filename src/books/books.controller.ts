import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createBook(@Body() createBookDto: CreateBookDto) {
    return this.booksService.addBook(createBookDto);
  }

  @Get()
  findAllNote() {
    return this.booksService.getAllBooks();
  }

  @Get(':id')
  findBookById(@Param('id') id: string) {
    return this.booksService.getBookById(id);
  }

  @Put(':id')
  putBookById(@Param('id') id: string, @Body() updateDto: CreateBookDto) {
    return this.booksService.editBookById(id, updateDto);
  }

  @Delete(':id')
  deleteBookByid(@Param('id') id: string) {
    return this.booksService.deleteBookById(id);
  }
}
