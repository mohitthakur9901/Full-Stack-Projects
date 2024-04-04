import express from 'express';
import cors from 'cors'; 
import cookieParaser from 'cookie-parser';
import AuthRoute from './routes/AuthRoute'

const app = express()


  app.use(cors(
    {
        origin:process.env.CORS_ORIGIN,
    }
  ))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(
    {
        origin:process.env.CORS_ORIGIN,
        credentials:true
    }
));
app.use(cookieParaser())


app.use('/api/auth', AuthRoute)


export {app}