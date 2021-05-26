const {response} = require('express');

const ProductCategory = require('../models/ProductCategory');


//***INDEX***
const index = (req,res) => {
  ProductCategory.find().sort({createdAt:-1})
  .then(data=>{
    res.json({
      response:true,
      data:data
    })
  })
}

//***VIEW***
const view = (req,res) => {
  ProductCategory.findById(req.params.id,(err,doc)=>{
    if(!err){
      res.json({
        response:true,
        data:doc
      })
    }else{
      res.json({
        response:false,
      })
    }
  })
}

//***STORE***
const store = (req,res) => {
  ProductCategory.create(req.body,(err,data)=>{
    if(!err){
      res.json({
        response:true
      })
    }else{
      res.json({
        response:false
      })
    }
  })
}

//***UPDATE***
const update =(req,res) => {
  ProductCategory.update({_id:req.params.id},req.body,(err,data)=>{
    if(!err){
      res.json({
        response:true
      })
    }else{
      res.json({
        response:false
      })
    }
  })
}

//***DELETE***
const deletepc = (req,res) => {
  ProductCategory.findByIdAndRemove(req.params.id,(err,doc)=>{
    if(!err){
      res.json({
        response:true
      })
    }else{
      res.json({
        response:false
      })
    }
  })
}

module.exports={index,view,store,update,deletepc};
