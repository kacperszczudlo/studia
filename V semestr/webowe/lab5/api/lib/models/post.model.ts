// lib/models/post.model.ts
import mongoose from 'mongoose';
import Post from '../interfaces/post.interface';

const postSchema = new mongoose.Schema<Post>({
    author: String,
    title: String,
    content: String,
});

const postModel = mongoose.model<Post>('Post', postSchema);

export default postModel;