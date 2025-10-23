export class CustomerDTO {
    constructor({id = null, name, email, phone, address}){
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.address = address;
    }

    // mapper to convert entity to DTO.
    static fromEntity(entity){
        return new CustomerDTO(entity);
    }
}

