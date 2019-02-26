class product {
    Name: string;
    Quantity: number;
    constructor(name: string, quantity: number) {
        this.Name = name;
        this.Quantity = quantity;
    }
    setQuantity(value: number) {
        this.Quantity = value;
    }
    getQuantity() {
        return this.Quantity;
    }
}

class productMaker {
    quantityOfProduct: number;
    sentProduct: number;
    products: product;

    makeProduct() {
        this.quantityOfProduct = Math.round(Math.random() * 100) + 50;
        this.products = new product('Dirol', this.quantityOfProduct);
    }
    getQuantity() {
        return this.quantityOfProduct;
    }
    setSentProduct(value: number) {
        this.sentProduct=value;
    }
    getSentProduct() {
        return this.sentProduct;
    }
}

class consumer {
    needsProduct: number;
    recievedProduct: number;

    needProduct() {
        this.needsProduct=Math.round(Math.random()*50)+70;
    }
    getNeedsProduct() {
        return this.needsProduct;
    }
    setRecievedProduct(value: number) {
        this.recievedProduct=value;
    }
}

class middleMan {
    maximumOfProducts: number;
    sentProduct: number;

    constructor() {
        this.maximumOfProducts=100;
    }
    deliveryProducts(products: number, needProducts: number, director: productMaker, Consumer: consumer) {
        var c=Math.min(products,needProducts);
        if (c>100)
            c=100;
        director.setSentProduct(c);
        Consumer.setRecievedProduct(c);
        this.sentProduct=c;
    }
    getSentProduct() {
        return this.sentProduct;
    }

}

var director=new productMaker;
var buyer=new consumer;
var midMan=new middleMan;
var makedProductOf3Days: number, sentProductOf3Days: number, efficiency: number;
var makedProduct: number[]=new Array(10);
var sentProduct: number[]=new Array(10);

console.log('Кол-во товара  Кол-во необх. товара  Кол-во доставленно товара за день  Кол-во произвед. товара за посл. 3 дня  Кол-во достав. товара за посл. 3 дня  КПД посредника ');
for (var i = 1; i <= 10; i++) {
    director.makeProduct();
    buyer.needProduct();
    midMan.deliveryProducts(director.getQuantity(), buyer.getNeedsProduct(), director, buyer);

    makedProduct[i] = director.getQuantity();
    sentProduct[i] = director.getSentProduct();
    if (i > 2) {
        makedProductOf3Days = makedProduct[i] + makedProduct[i - 1] + makedProduct[i - 2];
        sentProductOf3Days = sentProduct[i] + sentProduct[i - 1] + sentProduct[i - 2];
    } else
        if (makedProduct[2] == undefined) {
            makedProductOf3Days = makedProduct[1];
            sentProductOf3Days = sentProduct[1];
        } else {
            makedProductOf3Days = makedProduct[1] + makedProduct[2];
            sentProductOf3Days = sentProduct[1] + sentProduct[2];
        }
    efficiency = midMan.getSentProduct() / 100;
    console.log(director.getQuantity(), buyer.getNeedsProduct(), midMan.getSentProduct(), makedProductOf3Days, sentProductOf3Days, efficiency);
}