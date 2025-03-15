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

class ElementAttribute {
  name: string;
  value: string;

  constructor(attrName: string, attrValue: string) {
    this.name = attrName;
    this.value = attrValue;
  }
}

class Component {
  hookId: string;

  constructor(renderHookId: string) {
    this.hookId = renderHookId;
  }

  createRootElement(
    tag: string,
    cssClasses?: string,
    attributes?: Array<ElementAttribute>
  ) {
    const rootElement = document.createElement(tag);
    if (cssClasses) {
      rootElement.className = cssClasses;
    }
    if (attributes) {
      for (const attribute of attributes) {
        rootElement.setAttribute(attribute.name, attribute.value);
      }
    }
    document.getElementById(this.hookId)?.appendChild(rootElement);
    return rootElement;
  }
}

class ShoppingCart extends Component {
  constructor(renderHookId: string) {
    super(renderHookId);
  }

  items: Array<Product> = [];
  totalOutput: HTMLHeadingElement | null = null;

  set cartItems(value: Array<Product>) {
    this.items = value;
    this.totalOutput!.innerHTML = `<h2>Total: ${this.totalAmount}</h2>`;
  }

  get totalAmount() {
    return this.items.reduce(
      (prevVal, currItem) => prevVal + currItem.price,
      0
    );
  }

  addProduct(product: Product) {
    const updatedItems = [...this.items];
    updatedItems.push(product);
    this.cartItems = updatedItems;
  }

  render() {
    const cartElement = this.createRootElement('section', 'cart');
    cartElement.innerHTML = `
    <h2>Total: ${0}</h2>
    <button>Order Now!</button>
    `;
    this.totalOutput = cartElement.querySelector('h2') as HTMLHeadingElement;
  }
}

class ProductItem extends Component {
  product: Product;

  constructor(product: Product, renderHookId: string) {
    super(renderHookId);
    this.product = product;
  }

  addToCart() {
    App.addProductToCart(this.product);
  }

  render() {
    const productElement = this.createRootElement('li', 'product-item', [
      new ElementAttribute('id', 'product-item')
    ]);
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
  }
}

class ProductList extends Component {
  constructor(renderHookId: string) {
    super(renderHookId);
  }

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
    const productListElement = this.createRootElement('ul', 'product-list');
    productListElement.id = 'prod-list';
    for (const product of this.products) {
      const productItem = new ProductItem(product, productListElement.id);
      productItem.render();
    }
  }
}

class Shop {
  cart: ShoppingCart | null = null;

  render() {
    // const renderHook = document.getElementById('app') as HTMLDivElement;
    this.cart = new ShoppingCart('app');
    const productList = new ProductList('app');
    this.cart.render();
    productList.render();
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
