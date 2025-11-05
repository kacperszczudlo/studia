// lib/controllers/index.controller.ts
import Controller from '../interfaces/controller.interface';
import { Request, Response, Router } from 'express';
import path from 'path';

class IndexController implements Controller {
    // Ta ścieżka pasuje tylko do głównego adresu (np. http://localhost:3100)
    public path = '/';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, this.serveIndex);
    }

    // POPRAWKA: Prawidłowa ścieżka do pliku.
    // __dirname to '.../api/lib/controllers', więc cofamy się o jeden folder ('..') do '/lib',
    // a następnie wchodzimy do '/public'.
    private serveIndex = (request: Request, response: Response) => {
        response.sendFile(path.join(__dirname, '..', '..', 'public', 'index.html'));
    }
}

export default IndexController;