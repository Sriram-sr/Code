const express = require('express');
const bodyParser = require('body-parser');
const adminData = require('./routes/admin-routes');
const shopRoutes = require('./routes/shop-routes');
const rootDir = require('./utils/path');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(rootDir, 'public')));
app.set('view engine', 'ejs');
app.set('views', 'views'); 

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.render('404', {pageTitle: 'Page Not Found'})
});

app.listen(3000);