const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const result = require('dotenv').config();

// FOR IMAGEKIT AUTH
const ImageKit = require('imagekit');
var imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLICKEY,
    privateKey : process.env.IMAGEKIT_PRIVATEKEY,
    urlEndpoint : process.env.IMAGEKIT_URLENDPOINTKEY
});
// FOR IMAGEKIT AUTH

const User = require('./routes/user');
const ProductCategory = require('./routes/productcategory');
const ProductImage = require('./routes/productimage');
const ProductSubCategory = require('./routes/productsubcategory');
const Product = require('./routes/product');
const Cart = require('./routes/cart');
const Checkout = require('./routes/checkout');




mongoose.connect(process.env.MONGODB, {useNewUrlParser: true, useUnifiedTopology:true});
const db = mongoose.connection;

db.on('error',(err)=>{
    console.log('Failed to connect.')
    console.log(err);
});
db.once('open',()=>{
    console.log('Successfully Connected.');
})

// console.log(result.parsed);
// console.log(process.env.EMAIL_USER);

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors())


// // Add headers
// app.use(function (req, res, next) {
//
//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', '*');
//
//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//
//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//
//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);
//
//     // Pass to next layer of middleware
//     next();
// });


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/', (req,res)=>{
    res.send('<h1>FHFSI Server 1</h1>')
})
app.get('/imagekitauth', function (req, res) {
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
});

const PORT = process.env.port || 5000;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});

app.use('/api/user',User);
app.use('/api/productcategory',ProductCategory);
app.use('/api/productsubcategory',ProductSubCategory);
app.use('/api/productimage',ProductImage);
app.use('/api/product',Product);
app.use('/api/cart',Cart);
app.use('/api/checkout',Checkout);
