const db = require('../js/db');
const uniqid = require("uniqid");
const { type } = require('express/lib/response');

class Reservations {
    book_id;
    member_id;
    book_name;
    book_author;
    genre;

    async getReservedId(book_id) {
        var sql = "SELECT book_id FROM reservations WHERE reservations.book_id = ?"
        const result = await db.query(sql, [book_id]);
        if (JSON.stringify(result) != '[]') {
            this.book_id = result[0].book_id;
            return this.book_id;
        }
        else {
            return false;
        }
    }
    async getMemberId(member_id) {
        var sql = "select member_id from reservations WHERE reservations.member_id= ?";
        const result = await db.query(sql, [member_id])
            if (JSON.stringify(result) != '[]' ) {
                return result[0].member_id;
            }
            else {
                return false;
            }
    }

    async getTitle(book_name) {
        var sql = "SELECT book_name from reservations WHERE reservations.book_id = ?";
        const result = await db.query(sql, [this.book_id]);
        this.book_name = result[0].book_name;
    }
    async getAuthor(book_author) {
        var sql = "SELECT book_author from reservations WHERE reservations.book_id = ?";
        const result = await db.query(sql, [this.book_id]);
        this.book_author = result[0].book_author;
    }
    async getGenre(genre) {
        var sql = "SELECT genre from reservations WHERE reservations.book_id = ?";
        const result = await db.query(sql, [this.book_id]);
        this.book_genre = result[0].book_genre;
    }
    
    
    async addReservation(book_id, member_id, book_name, book_author, genre) {
        this.book_id = book_id;
        this.book_name = book_name;
        this.member_id = member_id;
        this.book_author = book_author;
        this.genre = genre;
        console.log(this.member_id, 'has Reserved the book: ', this.book_name, ' With the id of: ', this.book_id);
        var sql = "INSERT INTO reservations (book_id, member_id, book_name, book_author, genre) VALUES (?, ?, ?, ?, ?)";
        const result = await db.query(sql, [this.book_id, this.member_id, this.book_name, this.book_author, this.genre]);
        console.log(result);
        return true;
    }
}

module.exports = {
    Reservations
}