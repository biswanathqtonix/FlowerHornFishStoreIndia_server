const {response} = require('express');

const Product = require('../models/Product');


var Scraper = require("email-crawler");
const email = require('node-email-extractor').default;
const GetSiteUrls = require( 'get-site-urls' );
var Crawler = require("js-crawler");



//EMAIL

const emailfind = (req,res) => {
  // var emailscraper = new Scraper("https://www.qtonix.com/seo-faq/");
  // // A level is how far removed (in  terms of link clicks) a page is from the root page (only follows same domain routes)
  // emailscraper.getLevels(3).then((emails) => {
  //   // console.log(emails);
  //   res.json({
  //     response:true,
  //     data:emails
  //   })
  // })
  // .catch((e) => {
  //   console.log("error");
  // })



////////GET SITE URLS
// GetSiteUrls( 'https://digitalmarketinginstitute.com' )
//     .then( links => console.log( links ) );
// // GetSiteUrls( 'https://ds:ds@designsystem.apps.y.cld.gov.au' )
// //     .then( links => console.log( links ) );
// ( async () => {
//     const links = await GetSiteUrls( 'https://digitalmarketinginstitute.com' );
//     console.log( links );
// })();


// GET SITE URL
  new Crawler().configure({depth: 3})
  .crawl("https://www.kafesta.com", function onSuccess(page) {
    console.log(page.url);
    // res.json({
    //   response:true,
    //   data:emails
    // })
  });




// (async () => {
//     var data = await email.url('http://www.bbtrumpet.com/home-page/')
//     console.log(data);
// })()
//
// var data = email.text(`Contact Details
// Phone: +267 72301363 / 73316322
//
// Email: kumindaculture@gmail.com
//
// Registered with: `)
//
// console.log(data.domains)

}



//***INDEX***
const index = (req,res) => {
  Product.find().sort({createdAt:-1})
  .then(data=>{
    res.json({
      response:true,
      data:data
    })
  })
}

//***VIEW***
const view = (req,res) => {
  Product.findById(req.params.id,(err,doc)=>{
    if(!err){
      res.json({
        response:true,
        data:doc
      })
    }else{
      res.json({
        response:false
      })
    }
  })
}


const checkurl = (req,res) => {
  Product.findOne({url:req.params.url},(err,doc)=>{
    if(!err){
      // res.json({
      //   response:doc
      // })

      if(doc!==null){
        res.json({
          response:true,
        })
      }else{
        res.json({
          response:false,
          message: 'already_exist',
        })
      }

    }else{
      res.json({
        response:false
      })
    }
  })
}

//***STORE***
const store = (req,res) => {

  //CHECK URL IS AVAILABE OR NOT
  Product.findOne({url:req.body.url},(err,doc)=>{
    if(!err){
      if(doc!==null){
        res.json({
          response:false,
          message: 'already_exist',
        })
      }else{
        //INSERT DATA
        Product.create(req.body,(err,data)=>{
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
    }else{
      res.json({
        response:false
      })
    }
  })
}



//***UPDATE***
const update = (req,res) => {
  Product.update({_id:req.params.id},req.body,(err,doc)=>{
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
const deleteproduct = (req,res) => {
  Product.findByIdAndRemove(req.params.id,(err,doc)=>{
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

module.exports={emailfind,index,view,store,checkurl,update,deleteproduct};