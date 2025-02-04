import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app: Application = express();

// Middlewares
app.use(cors()); // Handle CORS
app.use(helmet()); // Secure HTTP headers
app.use(compression()); // Compress responses
app.use(express.json()); // JSON Parser
app.use(express.urlencoded({ extended: true })); // URL-encoded Parser
app.use(morgan('combined')); // Logging

// Import and use routes



export default app;
