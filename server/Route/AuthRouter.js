const { signup, login } = require('../Controller/AuthController');
const { signupValidation, loginValidation } = require('../Middleware/AuthValidation');

const router = require('express').Router();

// router.post('/login',(req,res)=>{
// res.send('login Sucess')
// });
router.post('/signup',signupValidation,signup);
router.post('/login',loginValidation,login);

module.exports=router;