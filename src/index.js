import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import userRoutes from './routes/userRoutes';
import roomRoutes from './routes/roomRoutes';
import bookingRoutes from './routes/bookingRoutes';
import errorHandler from './middleware/errorHandler';
import rateLimiter from './middleware/rateLimiter';
import logger from './utils/logger';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(rateLimiter);

app.use('/api/users', userRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));