// require('dotenv-safe').config();
const {response}= require('express');
// var bcrypt = require('bcryptjs');
// var salt = bcrypt.genSaltSync(10);

const User= require('../models/User');
// const LoginDetails= require('../models/LoginDetails');
//
// const ImageKit = require('imagekit');
// var imagekit = new ImageKit({
//     publicKey : "public_PT35bTumSZqcSo2PDGddDRBW5V8=",
//     privateKey : "private_0gua1/UMbXWRKqFvuKjVntd+Xw4=",
//     urlEndpoint : "https://ik.imagekit.io/aquariumstore"
// });

// const nodemailer = require('nodemailer');
// const Email = require('email-templates');
//
// const transporter = nodemailer.createTransport({
//   service: process.env.EMAIL_SERVICE,
//   host: process.env.EMAIL_HOST,
//   secureConnection: true,
//   port: 465,
//   auth: {
//   user: process.env.EMAIL_USER,
//   pass: process.env.EMAIL_PASS
//   }
//   });
//   const email = new Email({
//   transport: transporter,
//   send: true,
//   preview: false,
// });



//***INDEX***
const index = (req,res) => {
  User.find().sort({_id:-1})
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
