const express = require('express');
const router = express.Router();

const ProductSubCategoryController = require('../controllers/ProductController');

router.get('/',ProductSubCategoryController.index);
router.get('/:id',ProductSubCategoryController.view);
router.post('/',ProductSubCategoryController.store);
router.put('/:id',ProductSubCategoryController.update);
router.patch('/:id',ProductSubCategoryController.deleteproduct);



//check url availabe or not
router.get('/checkurl/:url',ProductSubCategoryController.checkurl);


// WEBISTE PAGE AND EMAIL EXTRACTOR
router.get('/emailfind/get',ProductSubCategoryController.emailfind);


module.exports=router;
