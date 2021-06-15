const {response}= require('express');
var _ = require('lodash');
const Checkout= require('../models/Checkout');


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

  if(checkuser){
    res.json({
        response:false,
        message:'already_exist',
    })
  }else{
    Checkout.create(req.body,(err,doc)=>{
      if(!err){
        res.json({
          response:true,
          message:'created'
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


module.exports={index,addcheckout};
