const express = require('express');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/admin-routes');
const shopRoutes = require('./routes/shop-routes');
const utilPaths = require('./utils/path');
const errorController = require('./controllers/error');
const dbUtils = require('./utils/database');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(utilPaths.staticDir));
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

dbUtils.mongoConnect(() => {
  app.listen(3000);
});
