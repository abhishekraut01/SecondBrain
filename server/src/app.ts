import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import dotenv from 'dotenv';
import path from 'path';
import errorHandler from './middlewares/globelErrorhandler.middleware';
import ApiError from './utils/ApiError';
import cookieParser from 'cookie-parser';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app: Application = express();

// Middlewares
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);
app.use(helmet());
app.use(cookieParser());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import and use routes
import authRoute from './routes/auth.routes';
import contentRoute from './routes/content.routes';
import shareRoute from './routes/share.routes';
import tagRoutes from './routes/tag.routes';
import userRoutes from './routes/user.routes';
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/content', contentRoute);
app.use('/api/v1/share', shareRoute);
app.use('/api/v1/tags', tagRoutes);
app.use('/api/v1/user', userRoutes);

// 404 Handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(404, 'Route Not Found'));
});

// Global Error Handler
app.use(errorHandler);
export default app;
