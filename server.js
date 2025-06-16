const express = require('express')
const app = express();
const port = 8090;
const cors = require('cors')
require('dotenv').config();
const cookieParser = require('cookie-parser');
const userRoute = require("./routes/userRoute")
const courseRoute = require('./routes/courseRoute');
const lessonRoute = require('./routes/lessonRoute');



app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
const connectDB = require('./db');
connectDB();

app.use('/user',userRoute)
app.use('/course',courseRoute)
app.use('/lesson',lessonRoute);

app.listen(port,(req,res)=>{
    console.log(`server is running on ${port}`)
})