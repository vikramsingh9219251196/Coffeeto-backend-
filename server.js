const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db.js');
const authRoutes = require('./routes/authRoute.js');
const cors = require('cors');
const categoryRoutes = require('./routes/CategoryRoute.js');
const productRoutes = require('./routes/ProductRoute.js');

dotenv.config();
connectDB();

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes);

app.get('*',(req,res,next)=>{
  res.status(200).json({
    message:'bad request'
  })
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, function() {
  console.log(`server is running ${process.env.DEV_MODE} on PORT ${PORT}`.bgCyan.white);
});
