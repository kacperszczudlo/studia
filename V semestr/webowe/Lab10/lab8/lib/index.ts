import App from './app';
import PostController from './modules/controllers/post.controller';

const app = new App([
    new PostController(),
]);

app.listen();