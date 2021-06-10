const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductCategorySchema = new Schema({
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

const ProductCategory = mongoose.model('ProductCategory',ProductCategorySchema);
module.exports = ProductCategory;
