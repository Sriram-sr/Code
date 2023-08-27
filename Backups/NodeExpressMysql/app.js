const express = require('express');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/admin-routes');
const shopRoutes = require('./routes/shop-routes');
const utilPaths = require('./utils/path');
const errorController = require('./controllers/error');
const sequelize = require('./utils/database');
const User = require('./models/user');
const Product = require('./models/product');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');
 
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(utilPaths.staticDir));
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use((req, res, next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

// Relations

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product); // Technically not needed as same meaning as above statement.
User.hasOne(Cart); // one-to-one relation
Cart.belongsTo(User); // This also same like above can be ignored.
Product.belongsToMany(Cart, { through: CartItem });
Cart.belongsToMany(Product, { through: CartItem }); // many-to-many relation
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

sequelize
  .sync()
//   .sync({ force: true })
  .then(result => {
    return User.findByPk(1);
  })
  .then(user => {
    if (!user) {
      return User.create({
        name: 'Sriram',
        email: 'test@test.com',
      });
    }
    return user;
  })
  .then(user => {
    if (!user) {
      return user.createCart();
    }
  })
  .then(cart => {
    app.listen(3000);
  })
  .catch(err => {
    console.log('Error in the first place ', err);
  });
