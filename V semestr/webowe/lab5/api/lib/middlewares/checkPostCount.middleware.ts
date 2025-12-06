import { RequestHandler, Request, Response, NextFunction } from 'express';
import { config } from "../config"; 

export const checkPostCount: RequestHandler = (request: Request, 
    response: Response, next: NextFunction) => { 

    const { num } = request.params; 
    const parsedValue = parseInt(num, 10); 

    // Sprawdza, czy wartość jest NaN lub jest >= 15 (poza zakresem <1, 14>)
    if (isNaN(parsedValue) || parsedValue >= config.supportedPostCount) { 
        return response.status(400).send('Brak lub niepoprawna wartość!'); 
    }

    next(); // Kontynuuje, jeśli walidacja się powiodła
};