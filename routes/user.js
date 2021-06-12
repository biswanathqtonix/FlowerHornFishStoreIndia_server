const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');


const multer  = require('multer')
const upload = multer({});

router.get('/',UserController.index);
router.get('/:id',UserController.view);
router.post('/',upload.single('image'),UserController.store);

router.put('/:id',UserController.update);


router.patch('/:id',UserController.deleteuser);

router.post('/login',UserController.login);

//web sociallogin
router.post('/sociallogin',UserController.sociallogin);
router.post('/socialloginfacebook',UserController.socialloginfacebook);

//web user register
router.post('/userregister',UserController.userregister);
//web email verification
router.post('/send-email-verification-code',UserController.sendemailverificationcode);
//web email check verification
router.post('/check-email-verification-code',UserController.checkemailverificationcode);
//forgot password
router.post('/forgotpassword',UserController.forgotpassword);


//web update user
router.put('/updateuserdetails/:id',UserController.updateuserdetails);

//web update new password
router.put('/updateuserpassword/:id',UserController.updateuserpassword);

//web update user image
router.put('/updateuserimage/:id',upload.single('image'),UserController.updateuserimage);


router.get('/login/details',UserController.logindetails);


router.get('/deleteimage/:imageid',UserController.deleteimage);


module.exports=router;
