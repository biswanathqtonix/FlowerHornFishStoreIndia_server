const mongoose= require('mongoose');
const Schema = mongoose.Schema;
// const { uuid } = require('uuidv4');

const userSchema=new Schema({
  usertype:{
    type:String
  },
  userstatus:{
    type:String
  },
  registervia:{
    type:String
  },
  name:{
    type:String
  },
  email_verification:{
    type:String
  },
  email_verification_code:{
    type:String,
    default:uuid()
  },
  email:{
    type:String
  },
  password:{
    type:String
  },
  contact:{
    type:String
  },
  whatsapp:{
    type:String
  },
  city:{
    type:String
  },
  state:{
    type:String
  },
  country:{
    type:String
  },
  pin:{
    type:String
  },
  fulladdress:{
    type:String
  },
  imagesmall:{
    type:String
  },
  imagemedium:{
    type:String
  },
  image:{
    type:String
  },
  image_name:{
    type:String
  },
  image_id:{
    type:String
  },
  image_path:{
    type:String
  }
},{timestamps:true})

const User = mongoose.model('User',userSchema);
module.exports=User;
