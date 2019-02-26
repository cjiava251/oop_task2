var product = /** @class */ (function () {
    function product(name, quantity) {
        this.Name = name;
        this.Quantity = quantity;
    }
    product.prototype.setQuantity = function (value) {
        this.Quantity = value;
    };
    product.prototype.getQuantity = function () {
        return this.Quantity;
    };
    return product;
}());
var productMaker = /** @class */ (function () {
    function productMaker() {
    }
    productMaker.prototype.makeProduct = function () {
        this.quantityOfProduct = Math.round(Math.random() * 100) + 50;
        this.products = new product('Dirol', this.quantityOfProduct);
    };
    productMaker.prototype.getQuantity = function () {
        return this.quantityOfProduct;
    };
    productMaker.prototype.setSentProduct = function (value) {
        this.sentProduct = value;
    };
    productMaker.prototype.getSentProduct = function () {
        return this.sentProduct;
    };
    return productMaker;
}());
var consumer = /** @class */ (function () {
    function consumer() {
    }
    consumer.prototype.needProduct = function () {
        this.needsProduct = Math.round(Math.random() * 50) + 70;
    };
    consumer.prototype.getNeedsProduct = function () {
        return this.needsProduct;
    };
    consumer.prototype.setRecievedProduct = function (value) {
        this.recievedProduct = value;
    };
    return consumer;
}());
var middleMan = /** @class */ (function () {
    function middleMan() {
        this.maximumOfProducts = 100;
    }
    middleMan.prototype.deliveryProducts = function (products, needProducts, director, Consumer) {
        var c = Math.min(products, needProducts);
        if (c > 100)
            c = 100;
        director.setSentProduct(c);
        Consumer.setRecievedProduct(c);
        this.sentProduct = c;
    };
    middleMan.prototype.getSentProduct = function () {
        return this.sentProduct;
    };
    return middleMan;
}());
var director = new productMaker;
var buyer = new consumer;
var midMan = new middleMan;
var makedProductOf3Days, sentProductOf3Days, efficiency;
var makedProduct = new Array(10);
var sentProduct = new Array(10);
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
    }
    else if (makedProduct[2] == undefined) {
        makedProductOf3Days = makedProduct[1];
        sentProductOf3Days = sentProduct[1];
    }
    else {
        makedProductOf3Days = makedProduct[1] + makedProduct[2];
        sentProductOf3Days = sentProduct[1] + sentProduct[2];
    }
    efficiency = midMan.getSentProduct() / 100;
    console.log(director.getQuantity(), buyer.getNeedsProduct(), midMan.getSentProduct(), makedProductOf3Days, sentProductOf3Days, efficiency);
}
