const enssureAuthenticate = require('../Middleware/Auth');

const router = require('express').Router();

router.get('/',enssureAuthenticate,(req,res)=>{
    console.log("login user detail",req.user);
res.status(200).json([
    {
        name:"watch",
        price:3000

    }
])
});


module.exports=router;