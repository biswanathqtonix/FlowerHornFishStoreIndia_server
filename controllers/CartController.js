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


const addtocart = (req,res) => {

    Cart.findOne({userid:req.body.userid,productid:req.body.productid})
    .then(response=>{
      if(response){
        res.json({
          response:false,
          message:'already_exist',
          data:response
        })
      }else{
        Cart.create(req.body,(err,doc)=>{
          if(!err){
            res.json({
              response:true,
              data:doc
            })
          }else{
            res.json({
              response:false,
              message:'failed_to_insert'
            })
          }
        })
      }
    })

}


const showproductsunderuser = (req,res) => {

  Cart.find({userid:req.params.userid})
  .then(response=>{
    res.json({
      response:true,
      data:response
    })
  })


}


const updatecartquantity = (req,res) => {

  Cart.update({_id:req.body.id},req.body)
  .then(response=>{
    res.json({
      response:true
    })
  })


}

module.exports={index,addtocart,showproductsunderuser,updatecartquantity};
