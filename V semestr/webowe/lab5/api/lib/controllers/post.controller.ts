// lib/controllers/post.controller.ts
import { Router, Request, Response } from 'express';
import Controller from '../interfaces/controller.interface';
import postModel from '../models/post.model';

class PostController implements Controller {
    public path = '/posts';
    public router = Router();
    private post = postModel;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        // Pobierz wszystkie posty
        this.router.get(this.path, this.getAllPosts);
        // Utwórz nowy post
        this.router.post(this.path, this.createPost);
    }

    private getAllPosts = async (req: Request, res: Response) => {
        try {
            const posts = await this.post.find();
            res.status(200).json(posts);
        } catch (error) {
            res.status(500).json({ message: "Błąd podczas pobierania postów", error });
        }
    }

    private createPost = async (req: Request, res: Response) => {
        const postData = req.body;
        try {
            const newPost = new this.post(postData);
            await newPost.save();
            res.status(201).json(newPost);
        } catch (error) {
            res.status(500).json({ message: "Błąd podczas tworzenia posta", error });
        }
    }
}

export default PostController;