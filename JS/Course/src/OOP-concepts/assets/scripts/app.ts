class Product {
  title: string;
  description: string;
  price: number;
  imageUrl: string;

  constructor(title: string, desc: string, price: number, image: string) {
    this.title = title;
    this.description = desc;
    this.price = price;
    this.imageUrl = image;
  }
}

class ShoppingCart {
  items = [];

  addProduct(product: Product) {
    console.log('Adding!', product);
  }

  render() {
    const cartElement = document.createElement('section');
    cartElement.innerHTML = `
    <h2>Total: ${0}</h2>
    <button>Order Now!</button>
    `;
    cartElement.className = 'cart';
    return cartElement;
  }
}

class ProductItem {
  product: Product;

  constructor(product: Product) {
    this.product = product;
  }

  addToCart() {
    App.addProductToCart(this.product);
  }

  render() {
    const productElement = document.createElement('li');
    productElement.className = 'product-item';
    productElement.innerHTML = `
            <div>
              <img src="${this.product.imageUrl} alt="${this.product.title}">
              <div class="product-item__content">
                <h2>${this.product.title}</h2>
                <h3>Rs. ${this.product.price}</h3>
                <p>${this.product.description}</p>
                <button>Add to Cart</button>
              </div>
            <div>
            `;
    const addToCartButton = productElement.querySelector('button');
    addToCartButton?.addEventListener('click', this.addToCart.bind(this));
    return productElement;
  }
}

class ProductList {
  products = [
    new Product(
      'Footwear',
      'A footwear of your choice!',
      1800,
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmyHL0z0RkjqXLTKU_yfcHrDYcKpHl45tM1g&s'
    ),
    new Product(
      'Handbag',
      "A women's style kit",
      2500,
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSib_lg_DU3POJbt29Rhg3gXZa85z1uUIwuCg&s'
    ),
    new Product(
      'Wallet',
      'Wallet for your Elite touch',
      1000,
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdjpcTFdjw_DISDUtAVMi-cdwjR5QBRZmf-Q&s'
    )
  ];

  render() {
    const productListElement = document.createElement('ul');
    productListElement.className = 'product-list';
    for (const product of this.products) {
      const productItem = new ProductItem(product);
      productListElement.appendChild(productItem.render());
    }
    return productListElement;
  }
}

class Shop {
  cart: ShoppingCart | null = null;

  render() {
    const renderHook = document.getElementById('app') as HTMLDivElement;
    this.cart = new ShoppingCart();
    const productList = new ProductList();
    renderHook.appendChild(this.cart.render());
    renderHook.appendChild(productList.render());
  }
}

class App {
  static cart: ShoppingCart | null = null;

  static init() {
    const shop = new Shop();
    shop.render();
    this.cart = shop.cart;
  }

  static addProductToCart(product: Product) {
    this.cart?.addProduct(product);
  }
}

App.init();
