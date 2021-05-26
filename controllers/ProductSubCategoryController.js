const {response} = require('express');

const ProductSubCategory = require('../models/ProductSubCategory');

//***INDEX***
const index = (req,res) => {
  ProductSubCategory.find().sort({createdAt:-1})
  .then(data=>{
    res.json({
      response:true,
      data:data
    })
  })
}

//***VIEW SUBCATEGORY UNDER CATEGORY***
const viewundercat = (req,res) => {
  ProductSubCategory.find({category:req.params.category}).sort({createdAt:-1})
  .then(data=>{
    res.json({
      response:true,
      data:data
    })
  })
}


//***VIEW***
const view = (req,res) => {
  ProductSubCategory.findById(req.params.id,(err,doc)=>{
    !err
    ? res.json({ response:true,data:doc })
    : res.json({ response:false })
  })
}

//***STORE***
const store = (req,res) => {
  ProductSubCategory.create(req.body,(err,doc)=>{
    !err
    ? res.json({ response:true })
    : res.json({ response:false })
  })
}


//***UPDATE***
const update =(req,res) => {
  ProductSubCategory.update({_id:req.params.id},req.body,(err,data)=>{
    !err
    ? res.json({ response:true })
    : res.json({ response:false })
  })
}

//***DELETE***
const remove = (req,res) => {
  ProductSubCategory.findByIdAndRemove(req.params.id,(err,doc)=>{
    !err
    ? res.json({ response:true })
    : res.json({ response:false })
  })
}

module.exports={index,view,store,update,remove,viewundercat};
