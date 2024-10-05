import logger from '../utils/logger';

export const errorHandler = (err, req, res, next) => {
  logger.error(err.message, { error: err });

  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ error: 'Invalid token' });
  }

  res.status(500).json({ error: 'Internal server error' });
};

export default errorHandler;