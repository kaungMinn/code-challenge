import express, { type Application } from 'express';
import { config } from './config/config.js';
import { responseMiddleware } from './middleware/response.middleware.js';
import { errorHandler } from './middleware/error.middleware.js';

const app: Application = express();

// Middleware
app.use(express.json());
app.use(responseMiddleware);

const server = app.listen(config.PORT, () => {
      console.log(`Server is listening on port ${config.PORT} in ${config.NODE_ENV} mode.`);
});


process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection at:', reason);
});

process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully...');
    server.close(() => {
        console.log("Server closed. Exiting process.");
    })
});

app.use(errorHandler);