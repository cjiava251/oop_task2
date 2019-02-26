/*
class product {
    constructor(name, quant) {
        this.nameOfProduct = name;
        this.quantity = quant;
    }

    setQuantity(value) {
        this.quantity = value;
    }
    getQuantity() {
        return this.quantity;
    }
}
*/

var Product = function (name, quant) {
    this.name = name;
    this.quantity = quant;
};
Product.prototype.setQuantity = function (value) {
    this.quantity = value;
}
Product.prototype.getQuantity = function () {
    return this.quantity;
}


var ProductMaker=function() {
    this.quantityOfProduct;
    this.products;
}
ProductMaker.prototype.makeProduct=function() {
    this.quantityOfProduct = Math.round(Math.random() * 100) + 50;
    this.products = new Product('Dirol', this.quantityOfProduct);
};
ProductMaker.prototype.getQuantity=function() {
    return this.quantityOfProduct;
};
ProductMaker.prototype.setSentProduct=function(value) {
    this.sentProduct=value;
};
ProductMaker.prototype.getSentProduct=function() {
    return this.sentProduct;
};


var Consumer=function() {
    this.needsProduct;
    this.recievedProduct;
}
Consumer.prototype.needProduct=function() {
    this.needsProduct=Math.round(Math.random()*50)+70;
};
Consumer.prototype.getNeedsProduct=function() {
    return this.needsProduct;
};
Consumer.prototype.setRecievedProduct=function(value) {
    this.recievedProduct=value;
};

var MiddleMan=function() {
    this.maximumOfProducts=100;
    this.sentProduct;
}
//MiddleMan.prototype=ProductMaker;
MiddleMan.prototype.deliveryProducts=function(products, needProducts, changeProducts, changeNeeds) {
    if (needProducts < this.maximumOfProducts) {
        if (products > needProducts) {
            //delivery needproducts
            delivery(changeProducts,changeNeeds,needProducts);
        }
        else {
            //delivery products
            delivery(changeProducts,changeNeeds,products);
        }
    }
    else {
        if (products < needProducts) {
            if (products >= this.maximumOfProducts) {
                //delivery 100
                delivery(changeProducts,changeNeeds,this.maximumOfProducts);
            }
            else {
                //delivery products
                delivery(changeProducts,changeNeeds,products);
            }
        }
        else {
            delivery(changeProducts,changeNeeds,this.maximumOfProducts);
        }
    }
};

MiddleMan.prototype.getSentProduct=function() {
    return this.sentProduct;
}

var director = new ProductMaker;
var buyer = new Consumer;
var midMan = new MiddleMan;
var makedProductOf3Days = 0, sentProductOf3Days = 0, efficiency = 0, makedProduct = [], sentProduct = [];

console.log('Кол-во товара  Кол-во необх. товара  Кол-во доставленно товара за день  Кол-во произвед. товара за посл. 3 дня  Кол-во достав. товара за посл. 3 дня  КПД посредника ');
for (var i = 1; i <= 10; i++) {
    director.makeProduct();
    buyer.needProduct();
    midMan.deliveryProducts(director.getQuantity(), buyer.getNeedsProduct(), director, buyer);

    makedProduct[i] = director.products.getQuantity();
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