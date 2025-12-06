import { RequestHandler, Request, Response, NextFunction } from 'express';

export const loggingMiddleware: RequestHandler = (request: Request, response: Response, next: NextFunction) => {
    // Implementacja logowania zgodnie ze Wskazówką 2 z Lab. 8
    console.log(`[${request.method} ${request.url} ${new Date().toISOString()}]`); 
    next();
};