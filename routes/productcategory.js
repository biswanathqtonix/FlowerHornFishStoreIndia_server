const express = require('express');
const router = express.Router();

const ProductCategoryController = require('../controllers/ProductCategoryController');

router.get('/',ProductCategoryController.index);
router.get('/:id',ProductCategoryController.view);
router.put('/:id',ProductCategoryController.update);
router.post('/',ProductCategoryController.store);
router.patch('/:id',ProductCategoryController.deletepc);


module.exports=router;
