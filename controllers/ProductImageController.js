const {response}= require('express');
// const bcrypt = require('bcryptjs')
// const saltRounds = 10;

const ProductImage= require('../models/ProductImage');


var ImageKit= require('imagekit');
var imagekit = new ImageKit({
    publicKey : "public_PT35bTumSZqcSo2PDGddDRBW5V8=",
    privateKey : "private_0gua1/UMbXWRKqFvuKjVntd+Xw4=",
    urlEndpoint : "https://ik.imagekit.io/aquariumstore"
});

//***INDEX***
const index = (req,res) => {
  ProductImage.find().sort({createdAt:-1})
  .then(response=>{
    res.json({
      response:true,
      data:response
    })
  })
  .catch({
  })
}


//***STORE***
const store = (req,res) => {


        const encoded = req.file.buffer.toString('base64');

        imagekit.upload({
          file : encoded,
          fileName : "products.jpg",
          useUniqueFileName:true,
          folder:'product_images'
        }).then(response => {

            ProductImage.create(response)
            res.json({
              response:true,
              data:response
            })


        }).catch(error => {
          res.json({
            response:error,
          })
        });


}


//***DELETE***
const remove = (req,res) => {
  imagekit.deleteFile(req.params.fileId).then(response => {
    ProductImage.findByIdAndRemove(req.params.id)
    .then(response=>{
      res.json({
        response:true,
      })
    })

  }).catch(error => {
      console.log(error);
  });
}

module.exports={index,store,remove};
