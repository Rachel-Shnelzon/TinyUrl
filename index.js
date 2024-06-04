import express from 'express'  
import bodyParser from "body-parser";
import UserRouter from './routers/userRouter.js';
import LinkRouter from './routers/linkRouter.js';
import connectDB from './database.js';


const app = express()
const port = 3000

// app.set('trust proxy', true);

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server started! on http://localhost:${port}`)
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/user', UserRouter)
app.use('/link', LinkRouter)
connectDB();

