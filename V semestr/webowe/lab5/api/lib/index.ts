// lib/index.ts
import App from './app';
import IndexController from './controllers/index.controller';
import PostController from './controllers/post.controller';

const app = new App([
    // NAJPIERW bardziej specyficzne kontrolery
    new PostController(),

    // NA KOŃCU kontroler ogólny/główny
    new IndexController()
]);

app.listen();