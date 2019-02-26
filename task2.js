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

class productMaker {
    makeProduct() {
        this.quantityOfProduct = Math.round(Math.random() * 100) + 50;
        this.products = new product('Dirol', this.quantityOfProduct);
    }
    getQuantity() {
        return this.quantityOfProduct;
    }
    setSentProduct(value) {
        this.sentProduct = value;
    }
    getSentProduct() {
        return this.sentProduct;
    }
}

class consumer {
    needProduct() {
        this.needsProduct = Math.round(Math.random() * 50) + 70;
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
        //this.sentProduct = 0;
    }
    delivery(products, needProducts, changeProducts, changeNeeds) {
        if (needProducts < this.maximumOfProducts) {
            if (products > needProducts) {
                //delivery needproducts
                changeProducts.setSentProduct(needProducts);
                changeNeeds.setRecievedProduct(needProducts);
                this.sentProduct = needProducts;
            }
            else {
                //delivery products
                changeProducts.setSentProduct(products);
                changeNeeds.setRecievedProduct(products);
                this.sentProduct = products;
            }
        }
        else {
            if (products < needProducts) {
                if (products >= this.maximumOfProducts) {
                    //delivery 100
                    changeProducts.setSentProduct(this.maximumOfProducts);
                    changeNeeds.setRecievedProduct(this.maximumOfProducts);
                    this.sentProduct = this.maximumOfProducts;
                }
                else {
                    //delivery products
                    changeProducts.setSentProduct(products);
                    changeNeeds.setRecievedProduct(products);
                    this.sentProduct = products;

                }
            }
            else {
                changeProducts.setSentProduct(this.maximumOfProducts);
                changeNeeds.setRecievedProduct(this.maximumOfProducts);
                this.sentProduct = this.maximumOfProducts;
            }
        }
    }

    getSentProduct() {
        return this.sentProduct;
    }
}


var director = new productMaker;
var buyer = new consumer;
var midMan = new middleMan;
var makedProductOf3Days = 0, sentProductOf3Days = 0, efficiency = 0, makedProduct = [], sentProduct = [];

console.log('Кол-во товара  Кол-во необх. товара  Кол-во доставленно товара за день  Кол-во произвед. товара за посл. 3 дня  Кол-во достав. товара за посл. 3 дня  КПД посредника ');
for (var i = 1; i <= 10; i++) {
    director.makeProduct();
    buyer.needProduct();
    midMan.delivery(director.getQuantity(), buyer.getNeedsProduct(), director, buyer);
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