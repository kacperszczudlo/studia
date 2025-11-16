import { Router, Request, Response, NextFunction } from 'express';
import Controller from '../interfaces/controller.interface';

let testArr = [4, 5, 6, 3, 5, 3, 7, 5, 13, 5, 6, 4, 3, 6, 3, 6];

class PostController implements Controller {
    public path = '/api';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/posts`, this.getAllPosts);

        this.router.get(`${this.path}/post/take/:num`, this.getNPosts);

        this.router.get(`${this.path}/post/:id`, this.getPostById);

        this.router.post(`${this.path}/post`, this.createPost);
        
        this.router.delete(`${this.path}/post/:id`, this.deletePost);

        this.router.delete(`${this.path}/posts`, this.deleteAllPosts);
    }

    private getAllPosts = (req: Request, res: Response, next: NextFunction) => {
        res.status(200).json(testArr);
    };

    private getPostById = (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        const postIndex = parseInt(id, 10);

        if (postIndex >= 0 && postIndex < testArr.length) {
            res.status(200).json(testArr[postIndex]);
        } else {
            res.status(404).json({ error: 'Element nie znaleziony' });
        }
    };

    private createPost = (req: Request, res: Response, next: NextFunction) => {
        const { elem } = req.body;
        if (elem != null) {
            testArr.push(elem);
            res.status(201).json(testArr);
        } else {
            res.status(400).json({ error: 'Brak "elem" w ciele zapytania' });
        }
    };

    private deletePost = (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        const postIndex = parseInt(id, 10);

        if (postIndex >= 0 && postIndex < testArr.length) {
            const deleted = testArr.splice(postIndex, 1);
            res.status(200).json({ deleted: deleted[0], currentArray: testArr });
        } else {
            res.status(404).json({ error: 'Element nie znaleziony' });
        }
    };

    private getNPosts = (req: Request, res: Response, next: NextFunction) => {
        const num = req.params.num;
        const count = parseInt(num, 10);

        if (count > 0) {
            const posts = testArr.slice(0, count);
            res.status(200).json(posts);
        } else {
            res.status(400).json({ error: 'Nieprawidłowa liczba elementów' });
        }
    };

    private deleteAllPosts = (req: Request, res: Response, next: NextFunction) => {
        testArr = [];
        res.status(200).json(testArr);
    };
}

export default PostController;
