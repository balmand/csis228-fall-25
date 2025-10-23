export class Customer {
    constructor({id = null, name, email, phone, address}){
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.address = address;
    }
}