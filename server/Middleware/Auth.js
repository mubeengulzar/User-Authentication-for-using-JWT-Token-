
const jwt = require('jsonwebtoken');
//const { model } = require('mongoose');

const enssureAuthenticate= (req,res,next)=>{
    const token = req.header('authorization')
    if(!token) return res.status(401).send('Access denied. No token provided')
        try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();}
    catch (err) {
        return res.status(400).json({message:"unauthorized,jWT token or expired"})
    }
}
module.exports=enssureAuthenticate;