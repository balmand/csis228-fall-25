export class BookDTO {
    constructor({id = null, title, author, year, price}){
        this.id = id;
        this.title = title;
        this.author = author;
        this.year = year;
        this.price = price;
    }

    // mapper to convert entity to DTO.
    static fromEntity(entity){
        return new BookDTO(entity);
    }
}

