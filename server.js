const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

// FOR IMAGEKIT AUTH
const ImageKit = require('imagekit');
var imagekit = new ImageKit({
    publicKey : "public_PT35bTumSZqcSo2PDGddDRBW5V8=",
    privateKey : "private_0gua1/UMbXWRKqFvuKjVntd+Xw4=",
    urlEndpoint : "https://ik.imagekit.io/aquariumstore"
});
// FOR IMAGEKIT AUTH

const User = require('./routes/user');
const ProductCategory = require('./routes/productcategory');
const ProductImage = require('./routes/productimage');
const ProductSubCategory = require('./routes/productsubcategory');
const Product = require('./routes/product');


mongoose.connect('mongodb+srv://b21341995returns:gurubaba@123@aquastore.mkuty.mongodb.net/databaseaquastore?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology:true});
const db = mongoose.connection;

db.on('error',(err)=>{
    console.log('Failed to connect.')
    console.log(err);
});
db.once('open',()=>{
    console.log('Successfully Connected.');
})

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.get('/', (req,res)=>{
    res.send('<h2>Hello World</h2>')
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
