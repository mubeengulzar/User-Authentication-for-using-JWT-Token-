const express= require('express')
const app =express();
const bodyParser=require('body-parser')
const cors = require('cors')
const AuthRouter=require('./Route/AuthRouter');
const ProductRouther=require('./Route/ProductRouter');


require('dotenv').config();
require("./Models/db");


app.use(bodyParser.json());
app.use(cors());
app.use('/auth',AuthRouter)
app.use('/product',ProductRouther)

const PORT = process.env.PORT||8080;

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);

})