const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/ProductController');


router.get('/nestedcategorymenu',ProductController.nestedcategorymenu);

//web all active product
router.get('/allproducts',ProductController.allproducts);
router.get('/allproducts/:category',ProductController.allproductscategory);
router.get('/allproducts/:category/:subcategory',ProductController.allproductscategorysubcategory);





router.get('/',ProductController.index);
router.get('/:id',ProductController.view);
router.post('/',ProductController.store);
router.put('/:id',ProductController.update);
router.patch('/:id',ProductController.deleteproduct);





//check url availabe or not
router.get('/checkurl/:url',ProductController.checkurl);


// WEBISTE PAGE AND EMAIL EXTRACTOR
router.get('/emailfind/get',ProductController.emailfind);


//TEST QTONIX LOCALHOST
router.post('/getemail',ProductController.getemail);


module.exports=router;
