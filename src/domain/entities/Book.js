export class Book {
    constructor({id = null, title, author, year, price}){
        this.id = id;
        this.title = title;
        this.author = author;
        this.year = year;
        this.price = price;
    }
}