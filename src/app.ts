import cropRouter from "./routes/crop.routes";

require('dotenv').config();
import express, {NextFunction, Request, Response} from 'express';
import config from 'config';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import {AppDataSource} from './utils/data-source';
import AppError from './utils/appError';
import authRouter from './routes/auth.routes';
import userRouter from './routes/user.routes';
import validateEnv from './utils/validateEnv';
import redisClient from './utils/connectRedis';
import fertilizerRouter from "./routes/fertilizer.routes";


AppDataSource.initialize()
    .then(async () => {
        validateEnv();

        const app = express();
        app.use(express.json({limit: '10kb'}));
        if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
        app.use(cookieParser());
        app.use(
            cors({
                origin: '*',
                credentials: true,
            })
        );
        app.use('/api/auth', authRouter);
        app.use('/api/users', userRouter);
        app.use('/api/crops', cropRouter);
        app.use('/api/fertilizers', fertilizerRouter);

        app.get('/api/healthChecker', async (_, res: Response) => {
            const message = await redisClient.get('try');
            res.status(200).json({
                status: 'success',
                message,
            });
        });

        app.all('*', (req: Request, res: Response, next: NextFunction) => {
            next(new AppError(404, `Route ${req.originalUrl} not found`));
        });

        app.use(
            (error: AppError, req: Request, res: Response, next: NextFunction) => {
                error.status = error.status || 'error';
                error.statusCode = error.statusCode || 500;

                res.status(error.statusCode).json({
                    status: error.status,
                    message: error.message,
                });
            }
        );

        const port = config.get<number>('port');
        app.listen(port);

        console.log(`Server started on port: ${port}`);
    })
    .catch((error) => console.log(error));
