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
        this.products = [];
        this.quantityOfProduct = [];
    }
    makeProduct(day) {
        this.quantityOfProduct[day] = Math.round(Math.random() * 100) + 50;
        this.products[day] = new product('Dirol', this.quantityOfProduct);
    }
    setSentProduct(day, value) {
        this.sentProduct[day] = value;
    }
    getSentProduct(day) {
        return this.sentProduct[day];
    }
    /*
    setRemainder(value) {  //остаток после доставок товара
        this.remainder = this.remainder + value;
    }
    getRemainder() {
        return this.remainder;
    }
    */
}

class consumer {
    constructor() {
        this.needsProduct = [];
    }
    needProduct(day) {
        this.needsProduct[day] = Math.round(Math.random() * 50) + 70;
    }
    getNeedsProduct(day) {
        return this.needsProduct[day];
    }
    setRecievedProduct(value) {
        this.recievedProduct = value;
    }
}

class middleMan {
    constructor() {
        this.maximumOfProducts = 100;
        this.recievedProduct = [];
    }
    delivery(day, products, needProducts, changeProducts, changeNeeds) {
        if (needProducts < this.maximumOfProducts) {
            if (products > needProducts) {
                //delivery needproducts
                changeProducts.setSentProduct(needProducts);
                changeProducts.setRemainder(products - needProducts);
                changeNeeds.setRecievedProduct(needProducts);
                this.recievedProduct[day] = needProducts;
            }
            else {
                //delivery products
                changeProducts.setSentProduct(products);
                changeProducts.setRemainder(0);
                changeNeeds.setRecievedProduct(products);
                this.recievedProduct[day] = products;
            }
        }
        else {
            if (products < needProducts) {
                if (products >= this.maximumOfProducts) {
                    //delivery 100
                    changeProducts.setSentProduct(this.maximumOfProducts);
                    changeProducts.setRemainder(products - this.maximumOfProducts);
                    changeNeeds.setRecievedProduct(this.maximumOfProducts);
                    this.recievedProduct[day] = this.maximumOfProducts;
                }
                else {
                    //delivery products
                    changeProducts.setSentProduct(products);
                    changeProducts.setRemainder(0);
                    changeNeeds.setRecievedProduct(products);
                    this.recievedProduct[day] = products;

                }
            }
        }
    }

    getRecievedProduct(day) {
        return this.recievedProduct[day];
    }
}


var director = new productMaker;
var buyer = new consumer;
var midMan = new middleMan;
var makedProductOf3Days = 0, sentProductOf3Days = 0, efficiency = 0;


for (var i = 1; i <= 10; i++) {
    director.makeProduct(i);
    buyer.needProduct(i);
    midMan.delivery(i, director.quantityOfProduct, buyer.getNeedsProduct(i), director, buyer);
    if (i > 7) {
        makedProductOf3Days = makedProductOf3Days + director.products[i].getQuantity();
        sentProductOf3Days = recievedProductOf3Days + director.getSentProduct(i);
        efficiency = efficiency + midMan.getRecievedProduct(i);
    }
}
efficiency = efficiency / 10;
//console.log(buyer.getNeedsProduct());

/*
var producer=new productMaker();
producer.makeProduct();
var kol=producer.getQuantityOfProduct();
console.log(kol);

*/