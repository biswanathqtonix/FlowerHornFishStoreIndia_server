const {response}= require('express');
var _ = require('lodash');
const Checkout= require('../models/Checkout');
const Cart= require('../models/Cart');



//***INDEX***
const index = (req,res) => {
  Checkout.find().sort({_id:-1})
  .then(response=>{
    res.json({
      response:true,
      data:response
    })
  })
  .catch({
  })
}


//***ADDCHECKOUT (web)***//
const addcheckout = async (req,res) => {

  const checkuser =  await Checkout.exists({userid:req.body.userid})
  const deletecartids = await Cart.find({userid:req.body.userid}).distinct('_id')

  const ids = deletecartids;
  const query = { _id: { $in: ids} };

  if(checkuser){
    res.json({
        response:false,
        message:'already_exist',
    })
  }else{
    Checkout.create(req.body,(err,doc)=>{
      if(!err){

        Cart.deleteMany(query)
        .then(resdelete=>{
          res.json({
            response:true,
            message:'created',
            deletecartids:deletecartids
          })
        })


      }else{
        res.json({
          response:false,
          message:'failed'
        })
      }
    })
  }

}


//***VIEW CHECKOUT (web)***//
const viewcheckout = async (req,res) => {

  Checkout.findOne({userid:req.params.userid},(err,doc)=>{
    if(!err){
      res.json({
        response:true,
        data:doc,

      })
    }else{
      res.json({
        response:false
      })
    }
  })
}


//***CHANGE STATUS (web)***//
const changestatus = (req,res) => {
  Checkout.update({_id:req.body.id},req.body,(err,doc)=>{
    if(!err){
      res.json({
        response:true,
        data:doc,
        ss:req.body.id
      })
    }else{
      res.json({
        response:false
      })
    }
  })

}

module.exports={index,addcheckout,viewcheckout,changestatus};
