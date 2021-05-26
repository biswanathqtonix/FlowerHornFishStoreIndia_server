const express = require('express');
const router = express.Router();
const multer = require('multer');

const UserController = require('../controllers/UserController');


// const upload = multer({});

router.get('/',UserController.index);
router.get('/:id',UserController.view);
router.post('/',upload.single('image'),UserController.store);

router.put('/:id',UserController.update);


router.patch('/:id',UserController.deleteuser);

// router.post('/login',UserController.login);
router.get('/login/details',UserController.logindetails);


router.get('/deleteimage/:imageid',UserController.deleteimage);


module.exports=router;
