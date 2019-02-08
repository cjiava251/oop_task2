class product {
    constructor(name) {
        this.setName(name);
    }
    setName(val) {
        this.name = val;
    }
    getName() {
        return this.name;
    }
}

class productMaker {
    constructor() {
        this.remainder = 0;
    }
    makeProduct() {
        this.quantityOfProduct = Math.round(Math.random() * 100) + 50;
    }
    getQuantityOfProduct() {
        return this.quantityOfProduct;
    }
    setSentProduct(value) {
        this.sentProduct = value;
    }
    setRemainder(value) {  //остаток после доставок товара
        this.remainder = this.remainder + value;
    }
}

class consumer {
    neededProduct() {
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
    }
    delivery(products, needProducts, changeProducts, changeNeeds) {
        if (needProducts < maximumOfProducts) {
            if (products > needProducts) {
                //delivery needproducts
                changeProducts.setSentProduct(needProducts);
                changeProducts.setRemainder(products-needProducts);
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
                    changeProducts.setRemainder(products-this.maximumOfProducts);
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

/*
var producer=new productMaker();
producer.makeProduct();
var kol=producer.getQuantityOfProduct();
console.log(kol);

*/