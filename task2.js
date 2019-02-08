class product {
    constructor(name, quant) {
        this.setName(name);
        this.setQuantity(quant);
    }
    setName(value) {
        this.name = value;
    }
    getName() {
        return this.name;

    }
    setQuantity(value) {
        this.quantity = value;
    }
    getQuantity() {
        return this.quantity;
    }
}

class productMaker {
    constructor() {
        this.remainder = 0;
    }
    makeProduct(day) {
        this.quantityOfProduct = Math.round(Math.random() * 100) + 50;
        var products = [];
        products[day] = new product('Dirol', this.quantityOfProduct);
    }
    setSentProduct(value) {
        this.sentProduct = value;
    }
    setRemainder(value) {  //остаток после доставок товара
        this.remainder = this.remainder + value;
    }
    getRemainder() {
        return this.remainder;
    }
}

class consumer {
    needProduct(day) {
        this.needsProduct=[];
        this.needsProduct[day] = Math.round(Math.random() * 50) + 70;
    }
    getNeedsProduct() {
        return this.needsProduct;
    }
    setRecievedProduct(value) {
        this.recievedProduct = value;
    }
}

class middleMan {
    constructor() {
        this.maximumOfProducts = 100;
    }
    delivery(products, needProducts, changeProducts, changeNeeds) {
        if (needProducts < this.maximumOfProducts) {
            if (products > needProducts) {
                //delivery needproducts
                changeProducts.setSentProduct(needProducts);
                changeProducts.setRemainder(products - needProducts);
                changeNeeds.setRecievedProduct(needProducts);

            }
            else {
                //delivery products
                changeProducts.setSentProduct(products);
                changeProducts.setRemainder(0);
                changeNeeds.setRecievedProduct(products);
            }
        }
        else {
            if (products < needProducts) {
                if (products >= this.maximumOfProducts) {
                    //delivery 100
                    changeProducts.setSentProduct(this.maximumOfProducts);
                    changeProducts.setRemainder(products - this.maximumOfProducts);
                    changeNeeds.setRecievedProduct(this.maximumOfProducts);
                }
                else {
                    changeProducts.setSentProduct(products);
                    changeProducts.setRemainder(0);
                    changeNeeds.setRecievedProduct(products);
                    //delivery products
                }
            }
        }
    }
}


var director = new productMaker;
var buyer = new consumer;
var midMan = new middleMan;


for (var i=1;i<=10;i++) {
    director.makeProduct(i);
    buyer.needProduct(i);
    midMan.delivery(director.quantityOfProduct,buyer.getNeedsProduct(),director,buyer);
}
console.log(buyer.getNeedsProduct());

/*
var producer=new productMaker();
producer.makeProduct();
var kol=producer.getQuantityOfProduct();
console.log(kol);

*/