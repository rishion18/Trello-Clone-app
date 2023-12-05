import express from 'express';
import {config} from 'dotenv';
import connectToDatabase from './config/dbConfig.js';
import memberRoutes from './routes/member.routes.js';
import actionRoutes from './routes/actions.routes.js'
import cookieParser from "cookie-parser";
import cors from 'cors';
config();

const app = express();

app.use(cors());

app.use(express.json());

app.use(cookieParser());

app.use('/api/member' , memberRoutes);
app.use('/api/action' , actionRoutes);

app.use('*' , (req , res) => {
  res.status(200).send('page not found');
})

app.listen('5056' , async() => {
  await connectToDatabase();
  console.log('listening at http://localhost:5056');
});