import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import nicRouter from './routes/nic.router.js';

const app = express();
app.use(express.json());

app.use('/test/',nicRouter);


const PORT = process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log(`App is running on port ${PORT}...`);
})