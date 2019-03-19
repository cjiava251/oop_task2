class Product {
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

class ProductMaker {
  constructor() {
    this.quantityOfProduct = 0;
  }

  makeProduct(min, range) {
    this.makedProductToday = Math.round(Math.random() * range) + min;
    this.products = new Product('Dirol', this.makedProductToday);
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

class Consumer {
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

class MiddleMan {
  constructor(max) {
    this.maximumOfProducts = max;
  }

  delivery(products, needProducts, changeProducts, changeNeeds) {
    let c = Math.min(needProducts, products);
    if (c > this.maximumOfProducts) c = this.maximumOfProducts;
    changeProducts.setSentProduct(c);
    changeNeeds.setRecievedProduct(c);
    this.sentProduct = c;
  }

  getSentProduct() {
    return this.sentProduct;
  }
}

const productMaker = new ProductMaker();
const buyer = new Consumer();
const midMan = new MiddleMan(100);
let makedProductOf3Days = 0; let sentProductOf3Days = 0; let efficiency = 0; const makedProduct = []; const
  sentProduct = [];

function undefinedToZero(value) {
  if (value === undefined) return 0;
  return value;
}

console.log('Кол-во товара(в конце дня, остаток)  Кол-во необх. товара  Кол-во доставленно товара за день  Кол-во произвед. товара за посл. 3 дня  Кол-во достав. товара за посл. 3 дня  КПД посредника ');


for (let i = 0; i <= 10; i++) {
  productMaker.makeProduct(50, 100);
  buyer.needProduct(70, 50);
  midMan.delivery(productMaker.getQuantity(), buyer.getNeedsProduct(), productMaker, buyer);
  makedProduct[i] = productMaker.products.getQuantity();
  sentProduct[i] = productMaker.getSentProduct();
  makedProductOf3Days = makedProduct[i] + undefinedToZero(makedProduct[i - 1]) + undefinedToZero(makedProduct[i - 2]);
  sentProductOf3Days = sentProduct[i] + undefinedToZero(sentProduct[i - 1]) + undefinedToZero(sentProduct[i - 2]);
  efficiency = midMan.getSentProduct() / 100;
  console.log(productMaker.getQuantity(), productMaker.getMakedProductToday(), buyer.getNeedsProduct(), midMan.getSentProduct(), makedProductOf3Days, sentProductOf3Days, efficiency);
}
