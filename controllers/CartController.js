const {response}= require('express');

const Cart= require('../models/Cart');


//***INDEX***
const index = (req,res) => {
  Cart.find().sort({_id:-1})
  .then(response=>{
    res.json({
      response:true,
      data:response
    })
  })
  .catch({
  })
}


module.exports={index};
