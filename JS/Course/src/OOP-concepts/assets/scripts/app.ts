const productList = {
  products: [
    {
      title: 'Footwear',
      description: 'A footwear of your choice!',
      price: 1800,
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmyHL0z0RkjqXLTKU_yfcHrDYcKpHl45tM1g&s'
    },
    {
      title: 'Handbag',
      description: "A women's style kit",
      price: 2500,
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSib_lg_DU3POJbt29Rhg3gXZa85z1uUIwuCg&s'
    },
    {
      title: 'Wallet',
      description: 'Wallet of your Elite touch',
      price: 1000,
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdjpcTFdjw_DISDUtAVMi-cdwjR5QBRZmf-Q&s'
    }
  ],
  render() {
    const renderHook = document.getElementById('app') as HTMLDivElement;
    const productListElement = document.createElement('ul');
    productListElement.className = 'product-list';
    for (const product of this.products) {
      const productElement = document.createElement('li');
      productElement.className = 'product-item';
      productElement.innerHTML = `
            <div>
              <img src="${product.imageUrl} alt="${product.title}">
              <div class="product-item__content">
                <h2>${product.title}</h2>
                <h3>Rs. ${product.price}</h3>
                <p>${product.description}</p>
                <button>Add to Cart</button>
              </div>
            <div>
            `;
      productListElement.appendChild(productElement);
    }
    renderHook.appendChild(productListElement);
  }
};

productList.render();
