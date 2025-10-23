import { pool } from "../../config/db.js";
import { Book } from "../entities/Book.js";

export class BookRepository {
    async create ({title, author, year, price}){
        const sql = `INSERT INTO books (title, author, year, price)
        VALUES ($1, $2, $3, $4)
        RETURNING id, title, author, year, price, created_at, updated_at;
        `;
        const {rows} = await pool.query(sql, [title, author, year, price]);
        return new Book(rows[0]);
    }

    async update(id, {title, author, year, price}){
        const sql = `UPDATE books SET title = $1, author = $2, year = $3, price = $4, updated_at = NOW()
        WHERE id = $5
        RETURNING id, title, author, year, price, created_at, updated_at;
        `;
        const {rows} = await pool.query(sql, [title, author, year, price, id]);

        return rows[0] ? new Book(rows[0]) : null;
    }
    async findAll(){
        const sql = `SELECT id, title, author, year, price, created_at, updated_at
        FROM books ORDER BY id DESC;`
        const {rows} = await pool.query(sql);

        return rows.map(r => new Book(r));
    }

    

    async findById(id){
        const sql = `SELECT id, title, author, year, price, created_at, updated_at
        FROM books 
        WHERE id = $1
        ORDER BY id DESC;`;

        const {rows} = await pool.query(sql, [id]);


        return rows[0] ? new Book(rows[0]) : null;
    }

    async delete(id) {
        const {rowCount} = await pool.query('DELETE FROM books WHERE id = $1', [id])
        return rowCount > 0;
    }
}