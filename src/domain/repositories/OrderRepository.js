import { pool } from "../../config/db.js";
import { OrderWithDetailsDTO } from "../dto/OrderWithDetailsDTO.js";
import {Order} from "../entities/Order.js";
import moment from "moment";

export class OrderRepository{
    async create({customer_id, book_id, quantity, total_price, status = 'pending'}){
        const sql = `INSERT INTO orders (customer_id, book_id, quantity, total_price, status, created_at, updated_at, order_date)
        VALUES ($1, $2, $3, $4, $5, now(), now(), $6)
        RETURNING id, customer_id, book_id, quantity, total_price, status, order_date, created_at, updated_at;
        `;
        let d = new Date();
        d.setMonth(11);
        let formattedDate = moment(d).format("YYYY-MM-DD");
        const {rows} = await pool.query(sql, [customer_id, book_id, quantity, total_price, status, d]);
        return new Order(rows[0]);
    }

    async update(id, {customer_id, book_id, quantity, total_price, status}){
        const sql = `UPDATE orders SET customer_id = $1, book_id = $2, quantity = $3,
        total_price = $4, status = $5 WHERE id = $6
        RETURNING id, customer_id, book_id, quantity, total_price, status, order_date, created_at, updated_at;
        `;

        const {rows} = await pool.query(sql, [customer_id, book_id, quantity, total_price, status, id])
        return rows[0] ? new Order(rows[0]) : null;
    }

    async findAll(){
        const sql = `SELECT id, customer_id, book_id, quantity, total_price, status, order_date, 
        updated_at, created_at FROM orders ORDER BY order_date DESC`;

        const {rows} = await pool.query(sql);
        return rows.map(r=> new Order(r));
    }

    async findById(id){
        const sql = "SELECT * FROM orders WHERE id = $1 ORDER BY order_date DESC";
        const {rows} = await pool.query(sql, [id]);
        return rows[0] ? new Order(rows[0]) : null;
    }

    async findAllWithDetails(){
        const sql = `SELECT * FROM orders
        INNER JOIN customers ON orders.customer_id = customers.id
        INNER JOIN books on orders.book_id = books.id
        ORDER BY orders.order_date DESC;  
        `
        const {rows} = await pool.query(sql);
        return rows.map(r=> new OrderWithDetailsDTO(r));
    }

    async findAllOrders(){
        const sql = `SELECT * FROM orders
        INNER JOIN customers ON orders.customer_id = customers.id
        INNER JOIN books on orders.book_id = books.id
        ORDER BY orders.order_date DESC;  
        `
        const {rows} = await pool.query(sql);
        return rows;
    }

    async delete(id){
        const sql = "DELETE FROM orders WHERE id = $1";
        const {rowCount} = await pool.query(sql, [id]);
        return rowCount > 0;
    }

}