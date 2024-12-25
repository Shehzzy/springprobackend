const mongoose = require('mongoose');
const createDefaultAdmin = require('./Admin');

mongoose.connect(process.env.MONGODB_URI).then(()=> {
    createDefaultAdmin();
    console.log("Database connected");
    
}).catch((error) => {
    console.log(error);
    
});