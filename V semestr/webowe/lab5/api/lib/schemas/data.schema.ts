import { Schema, model } from 'mongoose';
import { IData } from "../modules/models/data.model";

export const DataSchema: Schema = new Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    image: { type: String, required: true },
});

// Zastąp "KSZ" swoimi inicjałami, np. "Post-KSZ"
export default model<IData>('Post-KSZ', DataSchema);