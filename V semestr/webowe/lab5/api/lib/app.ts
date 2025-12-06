import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose'; // Dodano
import { config } from './config';
import Controller from './interfaces/controller.interface';
import { loggingMiddleware } from './middlewares/logging.middleware';

class App {
    public app: express.Application;

    constructor(controllers: Controller[]) {
        this.app = express();

        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.connectToDatabase(); // Dodano
    }
    
    private initializeMiddlewares(): void {
        this.app.use(express.json());
        // this.app.use(morgan('dev')); // ZAKOMENTOWANO / USUNIĘTO - Zgodnie z Lab. 8 używamy własnego middleware
        this.app.use(loggingMiddleware); // Dodano własny middleware logujący
    }

    private initializeControllers(controllers: Controller[]): void {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router); 
        });
    }

    private async connectToDatabase(): Promise<void> { // Dodano
        try {
            // Używamy body-parser, który jest częścią express.json()
            await mongoose.connect(config.databaseUrl);
            console.log('Connection with database established'); 
        } catch (error) {
            console.error('Error connecting to MongoDB:', error); 
        }

        mongoose.connection.on('error', (error) => {
            console.error('MongoDB connection error:', error); 
        });

        mongoose.connection.on('disconnected', () => { 
            console.log('MongoDB disconnected'); 
        });

        // Obsługa zamknięcia połączenia przy terminacji
        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            console.log('MongoDB connection closed due to app termination');
            process.exit(0);
        });
        
        process.on('SIGTERM', async () => {
            await mongoose.connection.close();
            console.log('MongoDB connection closed due to app termination');
            process.exit(0);
        });
    }

    public listen(): void {
        this.app.listen(config.port, () => {
            console.log(`App listening on the port ${config.port}`);
        });
    }
}

export default App;