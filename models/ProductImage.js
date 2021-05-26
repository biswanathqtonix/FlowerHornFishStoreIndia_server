const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductImageSchema = new Schema({
  fileId:{
    type:String
  },
  name:{
    type:String
  },
  size:{
    type:Number
  },
  filePath:{
    type:String
  },
  url:{
    type:String
  },
  fileType:{
    type:String
  },
  thumbnailUrl:{
    type:String
  },
},{timestamps:true})

const ProductImage = mongoose.model('ProductImage',ProductImageSchema)
module.exports = ProductImage;
