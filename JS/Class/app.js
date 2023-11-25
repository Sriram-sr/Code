// Static implementation in class

class ShoppingCart {
  static cart = [];

  static getCart() {
    this.cart.push(2);
    console.log(typeof this);
    return this.cart;
  }
}

// console.log(ShoppingCart.cart);
// ShoppingCart.getCart();

// Getter, Setters

class Product {
  constructor(title, price) {
    this.title = title;
    this.price = price;
  }

  get getTitle() {
    return this.title;
  }

  set setTitle(value) {
    this.title = value;
  }

  demonstrate() {
    console.log(`Title is ${this.getTitle}`);
  }
}

const product = new Product('Node JS', 10000);
// console.log(product.getTitle);

// Inheritance

class Base {
  constructor(brand) {
    this.brand = brand;
    this.render();
  }

  displayBrand() {
    console.log(`Brand is ${this.brand}`);
  }

  render() {}
}

class Child extends Base {
  constructor(model, brand) {
    super(brand);
    this.model = model;
  }

  displayModel() {
    console.log(`Model is ${this.model}`);
  }

  render() {
    console.log('Child got rendered!');
  }
}

// const child = new Child('T14', 'Lenovo');
// child.displayModel();
// child.displayBrand();

// Access Specifiers

class PrivateClass {
  #secretKey;

  constructor() {
    this.publicKey = 'Anyone can use';
    this.#secretKey = 'Super complex token';
  }

  getSecret() {
    console.log(this.#secretKey);
  }
}

class PrivateUser extends PrivateClass {
  useParentKey() {
    console.log(this.publicKey);
    // console.log(this.#secretKey); // Not supported
  }
}

// const childInstance = new PrivateUser();
// console.log(childInstance instanceof Child);

