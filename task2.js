class product {
  constructor(name, quantity) {
    this.nameOfProduct = name;
    this.quantity = quantity;
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
    this.quantityOfProduct = 0;
  }

  makeProduct(min, range) {
    this.makedProductToday = Math.round(Math.random() * range) + min;
    this.products = new product('Dirol', this.makedProductToday);
    this.quantityOfProduct += this.makedProductToday;
  }

  getQuantity() {
    return this.quantityOfProduct;
  }

  getMakedProductToday() {
    return this.makedProductToday;
  }

  setSentProduct(value) {
    this.sentProduct = value;
    this.quantityOfProduct -= value;
  }

  getSentProduct() {
    return this.sentProduct;
  }
}

class consumer {
  needProduct(min, range) {
    this.needsProduct = Math.round(Math.random() * range) + min;
  }

  getNeedsProduct() {
    return this.needsProduct;
  }

  setRecievedProduct(value) {
    this.recievedProduct = value;
  }
}

class middleMan {
  constructor(max) {
    this.maximumOfProducts = max;
    //this.sentProduct = 0;
  }

  delivery(products, needProducts, changeProducts, changeNeeds) {
    var c = Math.min(needProducts, products);
    if (c > this.maximumOfProducts)
      c = this.maximumOfProducts;
    changeProducts.setSentProduct(c);
    changeNeeds.setRecievedProduct(c);
    this.sentProduct = c;
  }
  
  getSentProduct() {
    return this.sentProduct;
  }
}

var director = new productMaker;
var buyer = new consumer;
var midMan = new middleMan(100);
var makedProductOf3Days = 0, sentProductOf3Days = 0, efficiency = 0, makedProduct = [], sentProduct = [];

console.log('Кол-во товара  Кол-во необх. товара  Кол-во доставленно товара за день  Кол-во произвед. товара за посл. 3 дня  Кол-во достав. товара за посл. 3 дня  КПД посредника ');
for (var i = 1; i <= 10; i++) {
  director.makeProduct(50, 100);
  buyer.needProduct(70, 50);
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
  console.log(director.getQuantity(), director.getMakedProductToday(), buyer.getNeedsProduct(), midMan.getSentProduct(), makedProductOf3Days, sentProductOf3Days, efficiency);
}