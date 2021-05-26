const express = require('express');
const router = express.Router();

const ProductImageController = require('../controllers/ProductImageController');

const multer  = require('multer')
const upload = multer({});

router.get('/',ProductImageController.index);
router.post('/',upload.single('image'),ProductImageController.store);
router.patch('/:fileId/:id',ProductImageController.remove);

module.exports=router;
