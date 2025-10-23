/**
 * Customer service class
 * used to manage customer business logic.
 * 
 */

import {CustomerDTO} from '../domain/dto/CustomerDTO.js';

export class CustomerService{
    constructor(customerRepository){
        this.customerRepository = customerRepository;
    }

    /**
     * list all customers
     * @returns List<Customers>
     */
    async listCustomers(){
        try {
            const customers = await this.customerRepository.findAll();
            return customers.map(customer => CustomerDTO.fromEntity(customer));
        } catch (error) {
            // propagate the error to controller.
            throw new Error(`Failed to list customers: ${error.message}`);
        }
    }

    /**
     * Retrieve customer by id
     * @param {int} id 
     * @returns Customer
     */
    async getCustomer(id){
        try {
            // error first handling 
            if (!id || isNaN(id)) {
                throw new Error('Invalid customer ID');
            }
            const customer = await this.customerRepository.findById(id);
            if (!customer) {
                return null;
            }
            return CustomerDTO.fromEntity(customer);
        } catch (error) {
            // propagating to the controller
            throw new Error(`Failed to get customer: ${error.message}`);
        }
    }

    async createCustomer(data){
        try {
            if (!data || !data.name || !data.email || !data.phone || !data.address) {
                throw new Error('Missing required fields');
            }
            const customer = await this.customerRepository.create(data);
            return CustomerDTO.fromEntity(customer);
        } catch (error) {
            throw new Error(`Failed to create cutomer: ${error.message}`);
        }
    }

    async updateCustomer(id, data){
        try {
            if (!id || isNaN(id)) {
                throw new Error('Invalid customer ID');
            }
            if (!data || Object.keys(data).length === 0) {
                throw new Error('No data provided for update');
            }
            const customer = await this.customerRepository.update(id, data);
            return customer ? CustomerDTO.fromEntity(customer) : null;
        } catch (error) {
            throw new Error(`Failed to update customer: ${error.message}`);
        }
    }

    async deleteCustomer(id){
        try {
            if (!id || isNaN(id)) {
                throw new Error('Invalid customer ID');
            }
            return await this.customerRepository.delete(id);
        } catch (error) {
            throw new Error(`Failed to delete customer: ${error.message}`);
        }
    }
}