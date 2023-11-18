class Product:
    def __init__(self):
        self._product_name = 'Some Product'

    @property
    def product(self):
        print('Method for setting product name called')
        return self._product_name

    @product.setter
    def product(self, name):
        print('Method for setting product name called')
        self._product_name = name

    @product.deleter
    def product(self):
        print('Method for deleting product name called')
        del self._product_name


new_product = Product()
print(new_product.product)
