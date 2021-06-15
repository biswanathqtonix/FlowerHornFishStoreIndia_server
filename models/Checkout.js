const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CheckoutSchema = new Schema({
  status:{
    type:String,
    default:'In Cart'
  },
  totalitems:{
    type:String
  },
  totalamount:{
    type:Number
  },
  orderid:{
    type:String
  },
  products:{
    type:Object
  },
  userid:{
    type:String
  },
  username:{
    type:String
  },
  useremail:{
    type:String
  },
  usercontact:{
    type:String
  },
  userimage:{
    type:String
  }
},{timestamps:true})

const Checkout = mongoose.model('Checkout',CheckoutSchema);
module.exports = Checkout;
