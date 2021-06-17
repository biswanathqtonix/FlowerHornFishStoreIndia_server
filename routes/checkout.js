const express = require('express');
const router = express.Router();

const CheckoutController = require('../controllers/CheckoutController');

router.get('/',CheckoutController.index);

//web store checkout
router.post('/addcheckout',CheckoutController.addcheckout);

//web view checkout
router.get('/viewcheckout/:userid',CheckoutController.viewcheckout);

//web view changestatus
router.post('/changestatus',CheckoutController.changestatus);


module.exports=router;
