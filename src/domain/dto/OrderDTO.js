import moment from "moment";

export class OrderDTO{
    constructor({id = null, customer_id, book_id, quantity, total_price, status = 'pending', order_date = null})
    {
        this.id = id;
        this.customer_id = customer_id;
        this.book_id = book_id;
        this.quantity = quantity;
        this.total_price = total_price;
        this.order_date = moment(order_date).format("YYYY-MM-DD");
    }

    static fromEntity(entity){
        return new OrderDTO(entity);
    }
}