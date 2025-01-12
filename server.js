const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
require('./utils/connection.js');
var authRouter = require('./Routes/auth-router.js');
var orderRouter = require('./Routes/order-router.js');
var app = express();
app.use(bodyParser.json());

app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

  app.options('*', cors()); 
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/order", orderRouter);





app.listen(process.env.PORT, ()=> {
    console.log(`Server running on port ${process.env.PORT}`);
    
});