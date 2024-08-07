const mongoose = require('mongoose');
require('dotenv').config();

//Set up default mongoose connection
var mongoDB = process.env.DB_URL;
mongoose.connect(mongoDB)
.then(() => {console.log('Connected to MongoDB')})
.catch((err)=>{
    console.log('Connected Error',err)
})

