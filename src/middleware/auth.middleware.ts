import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { RevokedToken } from '../models/token.model';

export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      res.sendStatus(401);
      return;
    }

    const token = authHeader.split(' ')[1];

    // Check if token is blacklisted
    const isRevoked = await RevokedToken.findOne({ token });
    if (isRevoked) {
      res.sendStatus(403);
      return;
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET!) as any;
    (req as any).userId = payload.userId;

    next(); // continue to next middleware
  } catch (err) {
    res.sendStatus(401);
  }
};