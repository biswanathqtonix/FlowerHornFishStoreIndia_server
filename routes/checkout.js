const express = require('express');
const router = express.Router();

const CheckoutController = require('../controllers/CheckoutController');

router.get('/',CheckoutController.index);

//web store checkout
router.post('/addcheckout',CheckoutController.addcheckout);

//web view checkout
router.get('/viewcheckout/:userid',CheckoutController.viewcheckout);

module.exports=router;
