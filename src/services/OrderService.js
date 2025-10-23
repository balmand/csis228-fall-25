/**
 * Order service class
 * used to manage order business logic.
 * 
 */

import {OrderDTO} from '../domain/dto/OrderDTO.js';
import {OrderWithDetailsDTO} from '../domain/dto/OrderWithDetailsDTO.js'

export class OrderService{
    constructor(orderRepository){
        this.orderRepository = orderRepository;
    }

    /**
     * list all customers
     * @returns List<Customers>
     */
    async listOrders(){
        try {
            const orders = await this.orderRepository.findAll();
            return orders.map(order => OrderDTO.fromEntity(order));
        } catch (error) {
            // propagate the error to controller.
            throw new Error(`Failed to list order: ${error.message}`);
        }
    }

    /**
     * Retrieve customer by id
     * @param {int} id 
     * @returns Customer
     */
    async getOrder(id){
        try {
            // error first handling 
            if (!id || isNaN(id)) {
                throw new Error('Invalid order ID');
            }
            const order = await this.orderRepository.findById(id);
            if (!order) {
                return null;
            }
            return OrderDTO.fromEntity(order);
        } catch (error) {
            // propagating to the controller
            throw new Error(`Failed to get order: ${error.message}`);
        }
    }

    async createOrder(data){
        try {
            const order = await this.orderRepository.create(data);
            return OrderDTO.fromEntity(order);
        } catch (error) {
            throw new Error(`Failed to create cutomer: ${error.message}`);
        }
    }

    async updateOrder(id, data){
        try {
            // error first check
            if (!id || isNaN(id)) {
                throw new Error('Invalid order ID');
            }
            if (!data || Object.keys(data).length === 0) {
                throw new Error('No data provided for update');
            }
            const order = await this.orderRepository.update(id, data);
            return order ? OrderDTO.fromEntity(order) : null;
        } catch (error) {
            throw new Error(`Failed to update order: ${error.message}`);
        }
    }

    async deleteOrder(id){
        try {
            if (!id || isNaN(id)) {
                throw new Error('Invalid order ID');
            }
            const result = await this.orderRepository.delete(id);
            return result;
        } catch (error) {
            throw new Error(`Failed to delete order: ${error.message}`);
        }
    }

    async getOrderWithDetails(){
        try{
            const orderWithDetailsDTO = await this.orderRepository.findAllWithDetails();
            return orderWithDetailsDTO ? orderWithDetailsDTO : null;
        }catch(e){
            throw new Error('Failed to load data');
        }
    }

    async getAllOrders() {
        const rows = await this.orderRepository.findAllOrders();
        return rows.map(r=> new OrderWithDetailsDTO(r));
    }
}