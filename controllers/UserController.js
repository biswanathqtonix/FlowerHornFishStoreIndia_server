require('dotenv-safe').config();
const {response}= require('express');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

const User= require('../models/User');
const LoginDetails= require('../models/LoginDetails');

const ImageKit = require('imagekit');
var imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLICKEY,
    privateKey : process.env.IMAGEKIT_PRIVATEKEY,
    urlEndpoint : process.env.IMAGEKIT_URLENDPOINTKEY
});

const nodemailer = require('nodemailer');
const Email = require('email-templates');

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  host: process.env.EMAIL_HOST,
  secureConnection: true,
  port: 465,
  auth: {
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS
  }

    //
    // service: 'Godaddy',
    // host: "smtpout.secureserver.net",
    // secureConnection: true,
    // port: 465,
    //
    // auth: {
    //     user: "info@flowerhornfishstoreindia.com",
    //     pass: "Apple@123"
    // }
  });
  const email = new Email({
  transport: transporter,
  send: true,
  preview: false,
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


//***SOCIAL LOGIN Facebook (WEB)***
const socialloginfacebook = (req,res) => {
  User.findOne({email:req.body.ku})
  .then(response=>{
    if(response){
      res.json({
        response:false,
        data:response,
        message:'Email already exist.'
      })
    }else{

      imagekit.upload({
        file : 'https://ik.imagekit.io/aquariumstore/myimages/unnamed_9sVgPsJTf.png',
        fileName : "userimage.jpg",
        useUniqueFileName:true,
        folder:'userprofileimage'
      }).then(image => {

          var user = new User();
          user.name = req.body.Ve;
          user.email = req.body.ku;
          user.usertype = 'User';
          user.registervia = 'FaceBook';
          user.userstatus = 'Active';
          user.email_verification = 'Verified';
          user.image = image.url;
          user.image_name =  image.name;
          user.image_id =  image.fileId;
          user.image_path =  image.filePath;
          user.imagesmall = image.url+'?tr=w-50,h-50';
          user.imagemedium = image.url+'?tr=w-250,h-250,q-40';
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

          }).catch(error => {
            res.json({
              response:false,
              message:'image_create_error',
              response:error,
            })
          });

    }
  })
}




//***SOCIAL LOGIN Google (WEB)***
const sociallogin = (req,res) => {
  User.findOne({email:req.body.ku})
  .then(response=>{
    if(response){
      res.json({
        response:false,
        data:response,
        message:'Email already exist.'
      })
    }else{

      imagekit.upload({
        file : req.body.ZJ,
        fileName : "userimage.jpg",
        useUniqueFileName:true,
        folder:'userprofileimage'
      }).then(image => {

          var user = new User();
          user.name = req.body.name;
          user.email = req.body.email;
          user.usertype = 'User';
          user.registervia = 'Google';
          user.userstatus = 'Active';
          user.email_verification = 'Verified';
          user.image = image.url;
          user.image_name =  image.name;
          user.image_id =  image.fileId;
          user.image_path =  image.filePath;
          user.imagesmall = image.url+'?tr=w-50,h-50';
          user.imagemedium = image.url+'?tr=w-250,h-250,q-40';
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

          }).catch(error => {
            res.json({
              response:false,
              message:'image_create_error',
              response:error,
            })
          });

    }
  })
}


//***USER REGISTER (WEB)***//
const userregister = (req,res) => {
  var hash = bcrypt.hashSync(req.body.password, salt);


    User.findOne({email:req.body.email})
    .then(response=>{
      if(response){
        res.json({
          response:false,
          data:response,
          message:'Email already exist.'
        })
      }else{


      imagekit.upload({
        file : 'https://ik.imagekit.io/aquariumstore/myimages/unnamed_9sVgPsJTf.png',
        fileName : "userimage.jpg",
        useUniqueFileName:true,
        folder:'userprofileimage'
      }).then(image => {

          var user = new User();
          user.name = req.body.name;
          user.email = req.body.email;
          user.contact = req.body.contact;
          user.password = hash;
          user.usertype = 'User';
          user.registervia = 'Web';
          user.userstatus = 'Active';
          user.email_verification = 'NotVerified';
          user.image = image.url;
          user.image_name =  image.name;
          user.image_id =  image.fileId;
          user.image_path =  image.filePath;
          user.imagesmall = image.url+'?tr=w-50,h-50';
          user.imagemedium = image.url+'?tr=w-250,h-250,q-40';
          user.save((err,doc)=>{
              if(!err){
                res.json({
                  response:true,
                  message:'registration_success',
                  data:doc
                })
              }else{
                res.json({
                  response:false,
                  message:'registration_failed'
                })
              }
          })


          }).catch(error => {
            res.json({
              response:false,
              message:'image_create_error',
              response:error,
            })
          });


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



//***SEND EMAIL VERIFICATION CODE (WEB)***//
const sendemailverificationcode = async (req,res) => {

  const user = await User.findById(req.body.id);

  //password is his email verification code

  // email.send({
  //       template: 'emailverification',
  //       message: {
  //         from:process.env.APP_NAME+' '+process.env.EMAIL_USER,
  //         to:user.email,
  //       },
  //       locals: {
  //         name:user.name,
  //         verifycode:user.email_verification_code,
  //         // fname: 'John',
  //         // lname: 'Snow',
  //       }
  //   }).then(() => console.log('email has been sent!'));


  res.json({
    response:true,
    email:req.body.id
  })
}

//***CHECK EMAIL VERIFICATION CODE (WEB)***//
const checkemailverificationcode = async (req,res) => {

  const user = await User.findById(req.body.id);

  if(user.email_verification_code === req.body.code){

    const udata = {email_verification:'Verified'};
    User.update({_id:req.body.id},udata,(err,doc)=>{
      if(!err){

        User.findById(req.body.id,(err,doc)=>{
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


      }else{
        res.json({
          response:false,
        })
      }
    })

  }else{
    res.json({
      response:false,
      code:req.body
    })
  }



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
module.exports={index,store,view,deleteimage,userregister,deleteuser,sociallogin,socialloginfacebook,checkemailverificationcode,login,update,logindetails,sendemailverificationcode};
