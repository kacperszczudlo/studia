import { Router, Request, Response, NextFunction } from 'express';
import Controller from '../interfaces/controller.interface';
import { checkPostCount } from '../middlewares/checkPostCount.middleware'; // Dodano
import DataService from '../modules/services/data.service'; // Dodano
import { IData } from '../modules/models/data.model';

// Usunięto: let testArr = [...]

class PostController implements Controller {
    public path = '/api';
    public router = Router();
    private dataService: DataService; // Dodano instancję serwisu

    constructor() {
        this.dataService = new DataService(); // Inicjalizacja serwisu
        this.initializeRoutes();
    }

    private initializeRoutes() {
        // GET all (query użyte w lab)
        this.router.get(`${this.path}/posts`, this.getAllPosts);
        
        // POST create (dodawanie danych do bazy)
        this.router.post(`${this.path}/data`, this.addData); 

        // POST z middleware (sprawdzenie :num)
        this.router.post(`${this.path}/data/:num`, checkPostCount, this.getPostByNum);
        
        // GET by ID (getById)
        this.router.get(`${this.path}/data/:id`, this.getPostById);

        // DELETE by ID (deleteById)
        this.router.delete(`${this.path}/data/:id`, this.removePostById); 

        // DELETE all (deleteAllPosts)
        this.router.delete(`${this.path}/posts`, this.deleteAllPosts); 
    }

    // Zaktualizowano: Pobieranie wszystkich postów z bazy
    private getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const allData = await this.dataService.query({});
            res.status(200).json(allData);
        } catch (error) {
            next(error); 
        }
    };
    
    // Zaktualizowano: Dodawanie danych do bazy
    // POPRAWIONO: Zmieniono 'response' na 'res'
    private addData = async (req: Request, res: Response, next: NextFunction) => {
        const { title, text, image } = req.body; 
        const readingData: IData = { title, text, image }; 

        try { 
            await this.dataService.createPost(readingData); 
            res.status(200).json(readingData); 
        } catch (error) { 
            console.error(`Validation Error: ${error.message}`); 
            res.status(400).json({ error: 'Invalid input data.' }); 
        }
    }

    // NOWA Metoda (Zadanie 7): Pobieranie elementu po ID z bazy (getById)
    // POPRAWIONO: Zmieniono 'response' na 'res'
    private getPostById = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params; 
        const post = await this.dataService.getById(id);
        
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ error: 'Post nie znaleziony.' });
        }
    }
    
    // NOWA Metoda (Zadanie 7): Usuwanie postu po ID z bazy (deleteById)
    // POPRAWIONO: Zmieniono 'response' na 'res'
    private removePostById = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params; 
        await this.dataService.deleteById(id); 
        res.sendStatus(200);
    };

    // NOWA Metoda (Zadanie 7): Usuwanie wszystkich postów (deleteAllPosts)
    // Używa 'res' – jest OK (dodano try...catch dla stabilności)
    private deleteAllPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await this.dataService.deleteAllPosts();
        res.sendStatus(200);
    } catch (error) {
        console.error("Błąd podczas usuwania wszystkich postów:", error);
        res.status(500).send("Wystąpił błąd serwera podczas usuwania danych.");
    }
};

    // Metoda POST z middleware (przykład działania middleware)
    private getPostByNum = async (req: Request, res: Response, next: NextFunction) => {
        const num = req.params.num;
        res.status(200).json({ message: `Liczba ${num} jest poprawna, middleware zadziałał!` });
    };

    // ... (Usunięte stare metody) ...

}

export default PostController;