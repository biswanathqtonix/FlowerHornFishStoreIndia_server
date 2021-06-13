const express = require('express');
const router = express.Router();

const CartController = require('../controllers/CartController');

router.get('/',CartController.index);


//web add to cart
router.post('/addtocart',CartController.addtocart);

//web show items under userid
router.get('/showproductsunderuser/:userid',CartController.showproductsunderuser);

module.exports=router;
