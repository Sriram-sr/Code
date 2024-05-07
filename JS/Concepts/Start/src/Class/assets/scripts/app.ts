class Product {
  title: string;
  imageUrl: string;
  price: number;
  description: string;

  constructor(title: string, image: string, price: number, desc: string) {
    this.title = title;
    this.description = desc;
    this.imageUrl = image;
    this.price = price;
  }
}

class ProductItem {
  product: Product;

  constructor(product: Product) {
    this.product = product;
  }

  addToCart() {
    console.log('Adding product to cart');
    console.log(this.product);
  }

  render() {
    const productElement = document.createElement('li');
    productElement.className = 'product-item';
    productElement.innerHTML = `
                <div>
                  <img src="${this.product.imageUrl}" alt="${this.product.title}">
                  <div class="product-item__content">
                    <h2>${this.product.title}</h2>
                    <h3>\$${this.product.price}</h3>
                    <p>${this.product.description}</p>
                    <button>Add to Cart</button>
                  </div>
                </div>
              `;
    const addCartButton = productElement.querySelector('button');
    addCartButton?.addEventListener('click', this.addToCart.bind(this));
    return productElement;
  }
}

class ProductList {
  products: Product[] = [
    new Product(
      'First Product',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPqKmgwX1P_1Ps9LNEVKGJHBXBJ-5RSStg6A&s',
      1200,
      'Great first product'
    ),
    new Product(
      'Second Product',
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAVsAAACRCAMAAABaFeu5AAAA6lBMVEX1/+Ou6Tiy7jj7/+mx7zGp4jeAinhwljP6/+etr6v3/+Wg2ilkhjKx7jaAsh/9/+xohUPW3M3O0sdwiFSHuiGa0ieUyia1ubK8v7gAAC6bnJuFjn+q5iy29Dik3DcNEi8ZIi8MES8FCC9ZeDKVxzZfgDKDrzSd0zY7TzBIYTEQFi/k7NW+w7VlfUt4qwheeT6lqqCz9Ch2njOKuTUdJy8VHS9PajFskTOItzVDWjEpOC+RwzUgKy98pjSIvhZ8hHiioaddb05jiyBpdGVqlhyMj45ib1lxoBaAhIJ6eoEAHxROcB0sJ0nV28g4s2yDAAADfElEQVR4nO3da1PTQBSAYbJJNQTXCpbaraS1TaFAVbQKKFiKF/DK//87JlBpdMZxCT3mMu8zQ7l8CNN3MiebBpqlJQAAAAAAAAAAAAAAAAB58osgyLuCCP/pcgGMKhm3/mxjJXfP16rZ9qHn5E01qtpWO47OU7XbdvYe5GevU+m26616flrNard95Of2+33aiqGtHNrKoa0c2sqhrRzayqGtHNrKoa0c2sqh7TXftWO/QdrO+E/v2HlhvUXazvhtz8rLx67tFmk747c3rK7SeLRdoq0k2sqhrRzayqGtHNrKoa0c2sq5bVul1Oyznn1F219u2bY2Hk9UUnYrOth8pRVtU27ZtmNML3TUsGsSr48Vbedu3bb7JHRqpncZt2cGirbXFtFWjU13f+AMD0yk2W/nFtI2MmYzdJxwi3mbtpC2h/F+20n+SJl1QtpC5m382DObHc0a7DcLaavemP6uMZHDTEjL2Fbpq7XsVVtHD7eTuvsd2qZka6smOzuXB65Z2/g4NnhrdvtHrBNSsrXVh8bc/a2to8KJ2WV9m5Zxvx3H0zVuqgamdxTP20Gyv4avu2aLtnMZ2x4n+2gYqu2+iZTaModKh534Z8e0nct4LNNH8aFre6cfPw5VPBiM2Tkw3f475m1K1jXY0Jhev98zZqKd+Nxh9s2Q12pSsrZVtc0nJt5bLyetHkb7xnSjGuvbtOznDuryH4FnNbW++qBtCtd05NBWDm3l0FYObeXQVg5t5dBWDm3l3LitskHbxM3auu2Tho2TKW1v2jYYrdmxfhNA2l4LbNlukLZyaCuHtnJoK4e2cmgrh7ZyaCuHtnJoK4e2cqrf1rV+nWDR3Kq3PV3Nz2m129bu56lW6baO1bUEKVW+v0OYa9mEbqzldzAVE9SXo3sFMB3ZXgMqi6C+9n5d573XxrT3oW3/Fo5l4I6mz0OrS+Ly9Mpeq16Zoeu77Q8b6t/P+n/xGh9X3UrUDeqtZyv638/4P1LepzO//IMhcEcfG/nft+xPaiNaLvtg8P2zT16BxsGc1zxfLXPdoP4oWilk2YT3+Ytb1vVYUL84b4ZFWHj9RegdlnQwBKOv3ybju4U2/v6jlPc9DVonTq3onGarjOuFoNUs7Ki9psradt3u3dhztV7OthdTy7sI5Gl6UcZ5G582lEEp0wIAAAAAAAAAAAAAAADl9RM4394FgyYQdQAAAABJRU5ErkJggg==',
      500,
      'Great second product'
    )
  ];

  constructor() {}

  render() {
    const prodList = document.createElement('ul');
    prodList.className = 'product-list';
    for (const product of this.products) {
      const productItem = new ProductItem(product);
      const productElement = productItem.render();
      prodList.appendChild(productElement);
    }
    return prodList;
  }
}

class ShoppingCart {
  items: any[] = [];

  render() {
    const cartElement = document.createElement('section');
    cartElement.innerHTML = `
      <h2>Total: \$${0}</h2>
      <button>Order Now!</button>
    `;
    cartElement.className = 'cart';
    return cartElement;
  }
}

class Shop {
  render() {
    const renderHook = document.getElementById('app');
    const shoppingCart = new ShoppingCart();
    const cartElement = shoppingCart.render();
    const productList = new ProductList();
    const productListElement = productList.render();

    renderHook?.appendChild(cartElement);
    renderHook?.appendChild(productListElement);
  }
}

const shop = new Shop();
shop.render();

// static

class App {
  static cart: string;

  static init() {
    this.cart = 'cart';
  }
}
