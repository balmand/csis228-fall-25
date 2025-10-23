export class OrderWithDetailsDTO{
    constructor(
        {id = null,
        customer_id,
        book_id,
        quantity,
        total_price,
        status,
        order_date,
        book_title,
        book_author,
        book_year,
        book_price,
        customer_name,
        customer_email,
        customer_phone,
        customer_address}
    ){
        this.id = id;
        this.customer_id = customer_id;
        this.book_id = book_id;
        this.quantity = quantity;
        this.total_price = total_price;
        this.status = status;
        this.order_date = order_date;
        this.book_title = book_title;
        this.book_author = book_author;
        this.book_year = book_year;
        this.book_price = book_price;
        this.customer_name = customer_name;
        this.customer_email = customer_email;
        this.customer_phone = customer_phone;
        this.customer_address = customer_address;
    }

    static fromEntity(entity){
        return new OrderWithDetailsDTO(entity);
    }
}