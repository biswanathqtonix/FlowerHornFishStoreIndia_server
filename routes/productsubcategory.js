const express = require('express');
const router = express.Router();

const ProductSubCategoryController = require('../controllers/ProductSubCategoryController');

router.get('/',ProductSubCategoryController.index);
router.get('/:id',ProductSubCategoryController.view);

router.post('/',ProductSubCategoryController.store);
router.put('/:id',ProductSubCategoryController.update);

router.patch('/:id',ProductSubCategoryController.remove);


// view sub category under category
router.get('/viewbycategory/:category',ProductSubCategoryController.viewundercat);


module.exports=router;
