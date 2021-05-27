
const {response}= require('express');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

const User= require('../models/User');
const LoginDetails= require('../models/LoginDetails');


var ImageKit= require('imagekit');
var imagekit = new ImageKit({
    publicKey : "public_PT35bTumSZqcSo2PDGddDRBW5V8=",
    privateKey : "private_0gua1/UMbXWRKqFvuKjVntd+Xw4=",
    urlEndpoint : "https://ik.imagekit.io/aquariumstore"
});

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



//***LOGIN DETAILS***
const logindetails = (req,res) => {
  LoginDetails.find().sort({_id:-1})
  .then(response=>{
    res.json({
      response:true,
      data:response
    })
  })
}


//***SOCIAL LOGIN DETAILS***
const sociallogin = (req,res) => {
  // LoginDetails.find().sort({_id:-1})
  // .then(response=>{
  //   res.json({
  //     response:true,
  //     data:response
  //   })
  // })
  // console.log(req.body);
  User.findOne({email:req.body.ku})
  .then(response=>{
    if(response){
      res.json({
        response:false,
        data:response,
        message:'Email already exist.'
      })
    }else{

          var user = new User();
          user.name = req.body.Ve;
          user.email = req.body.ku;
          user.usertype = 'User';
          user.registervia = 'SocialMedia';
          user.userstatus = 'Active';
          user.email_verification = 'Verified';
          user.image = req.body.ZJ;
          user.image_name = req.body.ZJ;
          user.image_id = req.body.ZJ;
          user.image_path = req.body.ZJ;
          user.imagesmall = req.body.ZJ;
          user.imagemedium = req.body.ZJ;
          user.save((err,doc)=>{
              if(!err){
                res.json({
                  response:true,
                  message:'Successfully created',
                  data:doc
                })
              }else{
                res.json({
                  response:false,
                  message:'Failed to create'
                })
              }
          })

      // });
    }
  })


}


//***LOGIN***
const login = (req,res) => {

  User.findOne({email:req.body.email},(err,doc)=>{
    if(!err){
         if(doc===null){
           res.json({
             response:false,
             message:'wrong_email'
           })
         }else{

           // bcrypt.compare(req.body.password, doc.password, function(err, match) {

           var match = bcrypt.compareSync(req.body.password, doc.password);

            if (match){
              LoginDetails.create(req.body)
              res.json({
                  response:true,
                  message:'login_success',
                  data:doc
                })
            } else {
              res.json({
                  response:false,
                  message:'wrong_password'
                })
            }
          // });
         }
    }else{
      res.json({
        response:false,
        message:'failed'
      })
    }
  })
}


//***STORE***
const store = (req,res) => {
  User.findOne({email:req.body.email})
  .then(response=>{
    if(response){
      res.json({
        response:false,
        message:'Email already exist.'
      })
    }else{

      // bcrypt.hash(req.body.password, saltRounds, function(err, hash) {


        var hash = bcrypt.hashSync(req.body.password, salt);


          var user = new User();
          user.name = req.body.name;
          user.email = req.body.email;
          user.password = hash;
          user.usertype = req.body.usertype;
          user.registervia = req.body.registervia;
          user.userstatus = req.body.userstatus;
          user.email_verification = req.body.email_verification;
          user.image = req.body.image;
          user.image_name = req.body.image_name;
          user.image_id = req.body.image_id;
          user.image_path = req.body.image_path;
          user.imagesmall = req.body.imagesmall;
          user.imagemedium = req.body.imagemedium;
          user.save((err,doc)=>{
              if(!err){
                res.json({
                  response:true,
                  message:'Successfully created',
                  data:doc
                })
              }else{
                res.json({
                  response:false,
                  message:'Failed to create'
                })
              }
          })

      // });
    }
  })
}


//***VIEW***
const view = (req,res) => {
  User.findById(req.params.id,(err,doc)=>{
    if(!err){
      res.json({
        response:true,
        data:doc
      })
    }else{
      res.json({
        response:false,
        message:'User doesnot exist'
      })
    }
  })
}


//***UPDATE***
const update = (req,res) => {

  User.update({_id:req.params.id},req.body)
  .then(response=>{
    res.json({
      response:true,
      data:response
    })
  })


}



//***DELETE USER***
const deleteuser = async (req,res) => {
    const user = await User.findById(req.params.id)

    if(user){
      imagekit.deleteFile(`${user.image_id}`).then(response => {
          console.log(response);

      }).catch(error => {
          console.log(error);
      });

    }else{
      res.json({
        response:false,
        message:'Failed find user',
        data:req.params.id
      })
    }

    User.findByIdAndRemove(req.params.id,(err,doc)=>{
      if(!err){
        res.json({
          response:true,
        })
      }else{
        res.json({
          response:false,
          message:'Failed delete user'
        })
      }
    })
}


//***DELETE IMAGE***
const deleteimage = (req,res) => {
  imagekit.deleteFile(req.params.imageid).then(response=>{
    res.json({
      response:true
    })
  })
}


// module.exports={index,store,view,deleteimage,deleteuser,update,logindetails};
module.exports={index,store,view,deleteimage,deleteuser,sociallogin,login,update,logindetails};
