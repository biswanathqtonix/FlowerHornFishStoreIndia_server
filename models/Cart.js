const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  status:{
    type:String,
    default:'In Cart'
  },
  userid:{
    type:String
  },
  productid:{
    type:String
  },
  name:{
    type:String
  },
  url:{
    type:String
  },
  mainprice:{
    type:Number
  },
  displayprice:{
    type:Number
  },
  image:{
    type:String
  },
  quantity:{
    type:Number
  }
},{timestamps:true})

const Cart = mongoose.model('Cart',CartSchema);
module.exports = Cart;
