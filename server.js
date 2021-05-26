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

//===ROUTE INCLUDE===
const User = require('./routes/user');
const ProductCategory = require('./routes/productcategory');
const ProductSubCategory = require('./routes/productsubcategory');
const ProductImage = require('./routes/productimage');
// const Product = require('./routes/product');
//===ROUTE INCLUDE===


//===DATABASE CONNECTION===
mongoose.connect('mongodb+srv://b21341995returns:gurubaba@123@aquastore.mkuty.mongodb.net/databaseaquastore?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology:true});


const db = mongoose.connection;

db.on('error',(err)=>{
    console.log('Failed to connect.')
    console.log(err);
});
db.once('open',()=>{
    console.log('Successfully Connected.');
})
//===DATABASE CONNECTION===


const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors())


app.get('/',(req,res)=>{
    // res.send({hi:'I am biswanath'});
    res.send('<h1>Working</h1>');
    // res.render('pages/home');
});

app.get('/api',(req,res)=>{
    // res.send({hi:'I am biswanath'});
    res.send('<h1>API</h1>');
    // res.render('pages/home');
});

// FOR IMAGEKIT AUTH
app.get('/imagekitauth', function (req, res) {
  var result = imagekit.getAuthenticationParameters();
  res.send(result);
});


// app.get('/ip',(req,res)=>{
//     res.send(req.ipInfo);
// });

const PORT = process.env.PORT || 5000;



app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})

//API ROUTES
app.use('/api/user',User);
app.use('/api/productcategory',ProductCategory);
app.use('/api/productsubcategory',ProductSubCategory);
app.use('/api/productimage',ProductImage);
// app.use('/api/product',Product);
//API ROUTES






// const express = require('express');
// const mongoose = require('mongoose');
// const morgan = require('morgan');
// const bodyParser = require('body-parser');
//
//
// mongoose.connect('mongodb+srv://b21341995returns:gurubaba@123@aquastore.mkuty.mongodb.net/databaseaquastore?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology:true});
// const db = mongoose.connection;
//
// db.on('error',(err)=>{
//     console.log('Failed to connect.')
//     console.log(err);
// });
// db.once('open',()=>{
//     console.log('Successfully Connected.');
// })
//
// const app = express();
// app.use(morgan('dev'));
// app.use(bodyParser.urlencoded({extended:true}));
// app.use(bodyParser.json());
//
//
// app.get('/', (req,res)=>{
//     res.send('<h2>Hello World</h2>')
// })
//
//
// const PORT = process.env.port || 5000;
//
// app.listen(PORT, ()=>{
//     console.log(`Server is running on port ${PORT}`);
// });
