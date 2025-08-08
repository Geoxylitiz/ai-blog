import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    slug:{
        type: String,
        required: true
    },
    title:{
        type: String,
        trim: true
    },
    content:{
        type: String
    }
}, {timestamps: true });

export const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);