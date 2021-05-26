const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');


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


const PORT = process.env.port || 5000;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});
