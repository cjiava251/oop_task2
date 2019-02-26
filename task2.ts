class product {
    Name: string;
    Quantity: number;
    constructor(public name: string, public quantity) {
        this.Name=name;
        this.Quantity=quantity;
    }
    setQuantity(value: number) {
        this.Quantity=value;
    }
    getQuantity() {
        return this.Quantity;
    }
}

class productMaker {
    quantityOfProduct: number;
    sentProduct
}