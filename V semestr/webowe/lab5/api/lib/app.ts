// lib/app.ts
import express from 'express';
import mongoose from 'mongoose';
import { config } from './config';
import Controller from './interfaces/controller.interface';

class App {
    public app: express.Application;

    constructor(controllers: Controller[]) {
        this.app = express();

        this.connectToTheDatabase();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }
    
    private initializeMiddlewares(): void {
        this.app.use(express.json());
    }

    // w pliku lib/app.ts
    private initializeControllers(controllers: Controller[]): void {
        controllers.forEach((controller) => {
            // Używamy '/' jako głównego prefixu
            this.app.use('/', controller.router); 
        });
    }
    
    public listen(): void {
        this.app.listen(config.port, () => {
            console.log(`App listening on the port ${config.port}`);
            console.log(`Połączono z bazą danych MongoDB.`);
        });
    }
    
    private connectToTheDatabase(): void {
        mongoose.connect(config.mongoUrl)
            .catch((error) => console.error('Błąd połączenia z bazą danych:', error));
    }
}

export default App;