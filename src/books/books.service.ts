import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Book } from './interfaces/book.interface';
import { CreateBookDto } from './dto/book.dto';
import { nanoid } from 'nanoid';

@Injectable()
export class BooksService {
  private books: Book[] = [];

  addBook(createBookDto: CreateBookDto) {
    const { name, readPage, pageCount } = createBookDto;

    if (!name) {
      throw new HttpException(
        {
          status: 'fail',
          message: 'Gagal menambahkan buku. Mohon isi nama buku',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (readPage > pageCount) {
      throw new HttpException(
        {
          status: 'fail',
          message:
            'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const id = nanoid(16);
    const timestamp = new Date().toISOString();

    const newBook: Book = {
      id,
      ...createBookDto,
      finished: readPage === pageCount,
      insertedAt: timestamp,
      updatedAt: timestamp,
    };
    this.books.push(newBook);

    return {
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    };
  }

  getAllBooks() {
    const booksData = this.books.map((book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    }));

    return {
      status: 'success',
      data: {
        books: booksData,
      },
    };
  }
}
