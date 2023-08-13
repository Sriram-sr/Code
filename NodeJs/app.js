const express = require('express');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/admin-routes');
const shopRoutes = require('./routes/shop-routes');
const rootDir = require('./utils/path');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(rootDir, 'public')));

app.use(shopRoutes);
app.use('/admin', adminRoutes);
app.use((req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', '404.html'));
});

app.listen(3000);