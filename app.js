const express = require('express');
const app = express();
const dotenv=require('dotenv');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const path = require('path');

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
const errorHandler = require('./middleware/error');

dotenv.config({ path: 'config.env' });

// routers
const product = require('./routes/productRoutes');
const user = require('./routes/userRoutes');
const order = require('./routes/orderRoutes');
const payment = require('./routes/paymentRoutes');

app.use('/api/v1', product);
app.use('/api/v1', user);
app.use('/api/v1', order);
app.use('/api/v1', payment);
app.use(errorHandler);

app.use(express.static(path.join((__dirname ,'./frontend/build'))));

app.get('*',function(req,res){
    res.sendFile(path.join(__dirname , './frontend/build/index.html'));
})

module.exports = app;
