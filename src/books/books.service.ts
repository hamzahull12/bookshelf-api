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

  getBookById(id: string) {
    const book = this.books.find((b) => b.id === id);
    if (!book) {
      throw new HttpException(
        {
          status: 'fail',
          message: 'Buku tidak ditemukan',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      status: 'success',
      data: { book },
    };
  }

  editBookById(id: string, updateDto: CreateBookDto) {
    const { name, readPage, pageCount } = updateDto;

    if (!name) {
      throw new HttpException(
        {
          status: 'fail',
          message: 'Gagal memperbarui buku. Mohon isi nama buku',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (readPage > pageCount) {
      throw new HttpException(
        {
          status: 'fail',
          message:
            'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const index = this.books.findIndex((book) => book.id === id);
    if (index === -1) {
      throw new HttpException(
        {
          status: 'fail',
          message: 'Gagal memperbarui buku. Id tidak ditemukan',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const timestamp = new Date().toDateString();
    this.books[index] = {
      ...this.books[index],
      ...updateDto,
      finished: updateDto.pageCount === updateDto.readPage,
      updatedAt: timestamp,
    };
    return {
      status: 'success',
      message: 'Buku berhasil diperbarui',
    };
  }

  deleteBookById(id: string) {
    const index = this.books.findIndex((book) => book.id === id);

    if (index === -1) {
      throw new HttpException(
        {
          status: 'fail',
          message: 'Buku gagal dihapus. Id tidak ditemukan',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    this.books.splice(index, 1);
    return {
      status: 'success',
      message: 'Buku berhasil dihapus',
    };
  }
}
