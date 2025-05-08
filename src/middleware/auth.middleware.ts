import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { RevokedToken } from '../models/token.model';

export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Authorization header missing or malformed' });
      return;
    }

    const token = authHeader.split(' ')[1];

    // Check if token is blacklisted
    const isRevoked = await RevokedToken.findOne({ token });
    if (isRevoked) {
      res.status(403).json({ error: 'Token has been revoked' });
      return;
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET!) as any;
    (req as any).userId = payload.userId;

    next();
  } catch (err: any) {
    console.error('JWT Verification Error:', err);

    if (err.name === 'TokenExpiredError') {
      res.status(401).json({ error: 'Access token expired' });
    } else if (err.name === 'JsonWebTokenError') {
      res.status(401).json({ error: 'Invalid token' });
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  }
};