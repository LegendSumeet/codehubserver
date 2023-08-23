import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';


import connectDB from './utils/db';
import auth from './routes/auth';
import merchant from './routes/merchant';
import client from './routes/client';
import { errorHandler } from './middleware/errorHandler';
import { authorize } from './middleware/authorize';
import { authenticate } from './middleware/authenticate';
import { authenticateMerchant } from './middleware/authenticateMerchant';

const app = express();

const PORT = 5000;

app.get('/', function (req, res) {
    res.send('<h1>Codehub API IS RUNNING</h1><br>');
  });

app.use(
    cors({
        origin: '*',
        credentials: true,
    })
);
app.use(cookieParser());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use('/api/auth', authorize, auth);
app.use('/api/merchant', authenticate, authenticateMerchant, merchant);
app.use('/api/client', authenticate, client);


app.use(errorHandler);


connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server Listening on Port ${PORT}`);
        });
    })
    .catch(console.log);
