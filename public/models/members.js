const db = require('../js/db');
const bcrypt = require("bcryptjs");
const uniqid = require("uniqid");
const res = require('express/lib/response');
class Members {
    member_id;
    username;
    email;
    password;

    async getEmailId(email) {
        var sql = "SELECT member_id FROM members WHERE members.email = ?"
        const result = await db.query(sql, [email]);
        if (JSON.stringify(result) != '[]') {
            this.member_id = result[0].member_id;
            return this.member_id;
        }
        else {
            return false;
        }
    }
    
    async getUsername() {
        var sql = "select username from members where members.member_id = ?";
        const result = await db.query(sql, [this.member_id]);
        this.username = result[0].username;
    }

    async findMemberById(member_id) {
        var sql = "select member_id from members WHERE members.member_id = ?";
        const result = await db.query(sql, [member_id])
            if (JSON.stringify(result) != '[]' ) {
                return result[0].member_id;
            }
            else {
                return false;
            }
    }
    async addMember(email, username, password) {
        this.email = email;
        this.username = username;
        this.password = await bcrypt.hash(password, 10);
        this.member_id = uniqid();
        console.log('hashed password is:', this.password, '| uniqid is:', this.member_id, '| email is:', this.email, '| username is:', this.username);
        var sql = "INSERT INTO members (member_id, email, username, password) VALUES (?, ?, ?, ?)";
        const result = await db.query(sql, [this.member_id, this.email, this.username, this.password]);
        console.log(result);
        return true; 
    }
     async authenticate(username, password) {
         console.log(username, password)
         var sql = "select password, member_id from members where username = ?";
         const result = await db.query(sql, [username]);
         console.log(result)
         const match = await bcrypt.compare(password, result[0].password);
         console.log(match)
         if (match == true) {
             return {match: true, _id: result[0].member_id};
         }
         else {
             return false;
         }
     }
}

module.exports = {
    Members
}