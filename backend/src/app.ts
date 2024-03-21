import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';



import UserRoute from './routes/User.Route'
import IssueRoute from './routes/Issue.Route'
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(
    {
        origin:process.env.CORS_ORIGIN,
        credentials:true
    }
));
app.use(express.static("public"));
app.use(cookieParser());


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/auth', UserRoute);
app.use('/api/issue', IssueRoute);

export {
    app
}