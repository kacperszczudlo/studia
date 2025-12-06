import mongoose, { Schema, Document } from 'mongoose';
import Post from '../interfaces/post.interface';

export interface PostDocument extends Post, Document {}

const postSchema: Schema = new Schema({
    author: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
});

const postModel = mongoose.model<PostDocument>('Post', postSchema);

export default postModel;