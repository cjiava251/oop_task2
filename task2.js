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
  constructor(min, max) {
    this.quantityOfProducts = 0;
    this.minimumProducts = min;
    this.maximumProducts = max;
  }

  makeProduct() {
    this.makedProductsToday = Math.round(Math.random() * (this.maximumProducts - this.minimumProducts)) + this.minimumProducts;
    this.products = new Product('Dirol', this.makedProductsToday);
    this.quantityOfProducts += this.makedProductsToday;
  }

  getQuantityOfProducts() {
    return this.quantityOfProducts;
  }

  getMakedProductsToday() {
    return this.makedProductsToday;
  }

  giveProductsToMiddleMan(value) {
    this.quantityOfProducts -= value;
  }
}

class Consumer {
  constructor(min, max) {
    this.minimumProducts = min;
    this.maximumProducts = max;
    this.needProducts = 0;
  }
  needProduct() {
    this.needProductsToday = Math.round(Math.random() * (this.maximumProducts - this.minimumProducts)) + this.minimumProducts;
    this.needProducts += this.needProductsToday;
  }

  getNeedProducts() {
    return this.needProducts;
  }

  getNeedProductsToday() {
    return this.needProductsToday;
  }

  recieveProducts(value) {
    this.needProducts -= value;
  }
}

class MiddleMan {
  constructor(max) {
    this.maximumOfProducts = max;
  }

  delivery(productMaker, consumer) {
    let min = Math.min(consumer.getNeedProducts(), productMaker.getQuantityOfProducts());
    if (min > this.maximumOfProducts) min = this.maximumOfProducts;
    productMaker.giveProductsToMiddleMan(min);
    consumer.recieveProducts(min);
    this.sentProduct = min;
  }

  getSentProduct() {
    return this.sentProduct;
  }
  getMaximumOfProducts() {
    return this.maximumOfProducts;
  }
}

class Statistics {
  constructor() {
    this.makedProductsOf3Days = 0;
    this.sentProductsOf3Days = 0;
    this.efficiencyOfMiddleMan = 0;
    this.makedProduct = [];
    this.sentProducts = [];
  }

  sumOfLastElements(array, n) {
    let sub = array.length - n;
    if (sub < 0) sub = 0;
    array = array.slice(sub, array.length);
    return array.reduce(function (sum, current) {
      return sum + current;
    });
  }

  startCount(days, productMaker, consumer, middleMan) {
    for (let i = 0; i <= days; i++) {
      productMaker.makeProduct();
      consumer.needProduct();
      middleMan.delivery(productMaker, consumer);
      this.makedProduct.push(productMaker.getMakedProductsToday());
      this.sentProducts.push(middleMan.getSentProduct());
      this.makedProductsOf3Days = this.sumOfLastElements(this.makedProduct, 3);
      this.sentProductsOf3Days = this.sumOfLastElements(this.sentProducts, 3);
      this.efficiencyOfMiddleMan = middleMan.getSentProduct() / middleMan.getMaximumOfProducts();
      console.log(productMaker.getQuantityOfProducts(), productMaker.getMakedProductsToday(), consumer.getNeedProducts(), consumer.getNeedProductsToday(), middleMan.getSentProduct(), this.makedProductsOf3Days, this.sentProductsOf3Days, this.efficiencyOfMiddleMan);
    }
  }
}

const productMaker = new ProductMaker(50, 150);
const consumer = new Consumer(70, 120);
const middleMan = new MiddleMan(100);
const stat = new Statistics();

console.log('Кол-во товара у производителя(после доставки)  Кол-во произведенного сегодня товара Кол-во необходимого товара(после доставки)  Кол-во необходимого потребителю товара(сегодня)   Кол-во доставленно товара за день  Кол-во произвед. товара за посл. 3 дня  Кол-во достав. товара за посл. 3 дня  КПД посредника ');
stat.startCount(10, productMaker, consumer, middleMan);
