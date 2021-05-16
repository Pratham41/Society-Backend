import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './routes/userRoutes.js';

const app = express();

dotenv.config(); //

app.use(cors());

app.use(express.json()); //

app.use('/sms/user', userRouter);

const port = process.env.PORT || 6000;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
