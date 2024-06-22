// import { Router } from 'express';
import globalErrorHandler from './app/Middleware/GlobalErrorHandler';
import notFound from './app/Middleware/NotFound';
import cookieParser from 'cookie-parser';

import cors from 'cors';
import express, { Application } from 'express';
import router from './app/Routers';

const app: Application = express();

 app.use(express.json());
app.use(cookieParser())
app.use(cors({ origin: ['http://loclhost:5173/api/v1'] }));

 app.use('/api', router);

 app.get("/", (req, res) => {
    res.json({
        message: " Car Rental System Service is Running!",
    });
});
app.use(globalErrorHandler);

app.use(notFound);

export default app;