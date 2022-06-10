const res = require('express/lib/response');
const db = require('../js/db');

class Book {
    book_id;
    book_name;
    book_author;
    genre;
    constructor(book_id) {
        this.book_id = book_id;
    }
    async getBookDetails() {
        if (typeof this.book_name !== 'string') {
            var sql = "select * from books where `book_id` = ?"
            const result = await db.query(sql, [this.book_id]);
            this.book_name = result[0].book_name;
        }
    }
    async getBookAuthor() {
        var sql = "select `book_author` from books where `book_id` = ?"
        const result = await db.query(sql, [this.book_id]);
        this.book_author = result[0].book_author;
    } 
    async getBookGenre() {
        var sql = "select `genre` from books where `book_id` = ?"
        const result = await db.query(sql, [this.book_id]);
        this.genre = result[0].genre;
    }
    
}
module.exports = {
    Book
}