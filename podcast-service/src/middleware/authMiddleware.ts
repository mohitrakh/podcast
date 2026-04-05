import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
    user?: { id: string };
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        res.status(401).json({ success: false, message: 'No token, authorization denied' });
        return;
    }

    const decoded = jwt.decode(token) as { id: string } | null;

    if (!decoded) {
        res.status(401).json({ success: false, message: 'Token is not valid' });
        return;
    }

    req.user = decoded;
    next();
};
