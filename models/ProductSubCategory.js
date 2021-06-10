const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSubCategorySchema = new Schema({
  category:{
    type:String
  },
  name:{
    type:String
  },
  url:{
    type:String
  },
  title:{
    type:String
  },
  desc:{
    type:String
  },
  image:{
    type:String
  },
  display:{
    type:String
  }
},{timestamps:true})

const ProductSubCategory = mongoose.model('ProductSubCategory',ProductSubCategorySchema)
module.exports = ProductSubCategory;
