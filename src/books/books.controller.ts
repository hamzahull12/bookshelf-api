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
  Query,
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
  findAllNote(
    @Query('name') name?: string,
    @Query('reading') reading?: number,
    @Query('finished') finished?: number,
  ) {
    return this.booksService.getAllBooks({ name, reading, finished });
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
