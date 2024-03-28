import express from  'express'
import cors from 'cors';
import AuthRoute from './routes/AuthRoute';
import UserRoute from './routes/User'
import TaskRoute from './routes/TaskRoute'
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(
    {
        origin:process.env.CORS_ORIGIN,
        credentials:true
    }
));
app.use(express.static("public"));


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/user', UserRoute)
app.use('/api/auth', AuthRoute)
app.use('/api/task', TaskRoute)


export {app}