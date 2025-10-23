import {BookDTO} from '../domain/dto/BookDTO.js';

export class BookService{
    constructor(bookRepository){
        this.bookRepository = bookRepository;
    }

    async listBooks(){
        try {
            const books = await this.bookRepository.findAll();
            return books.map(book => BookDTO.fromEntity(book));
        } catch (error) {
            throw new Error(`Failed to list books: ${error.message}`);
        }
    }

    async getBook(id){
        try {
            if (!id || isNaN(id)) {
                throw new Error('Invalid book ID');
            }
            const book = await this.bookRepository.findById(id);
            if (!book) {
                return null;
            }
            return BookDTO.fromEntity(book);
        } catch (error) {
            throw new Error(`Failed to get book: ${error.message}`);
        }
    }

    async createBook(data){
        try {
            if (!data || !data.title || !data.author || !data.year || !data.price) {
                throw new Error('Missing required fields: title, author, year, price');
            }
            const book = await this.bookRepository.create(data);
            return BookDTO.fromEntity(book);
        } catch (error) {
            throw new Error(`Failed to create book: ${error.message}`);
        }
    }

    async updateBook(id, data){
        try {
            if (!id || isNaN(id)) {
                throw new Error('Invalid book ID');
            }
            if (!data || Object.keys(data).length === 0) {
                throw new Error('No data provided for update');
            }
            const book = await this.bookRepository.update(id, data);
            return book ? BookDTO.fromEntity(book) : null;
        } catch (error) {
            throw new Error(`Failed to update book: ${error.message}`);
        }
    }

    async deleteBook(id){
        try {
            if (!id || isNaN(id)) {
                throw new Error('Invalid book ID');
            }
            return await this.bookRepository.delete(id);
        } catch (error) {
            throw new Error(`Failed to delete book: ${error.message}`);
        }
    }
}