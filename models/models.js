import mongoose from 'mongoose';

const  articlesSchema =  new mongoose.Schema({
    title:  {
        type: String,
        required: true,
        unique: false
    },
    description: {
        type: String,
        required: true
    },
    markdown: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    image: {
        type: String,
        default: '/',
        required: true
    },
    sanitizedHTML: {
        type: String,
        required: true,
        default: '##Hello'
    }

});

const blogUserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true,
        minLength: [8, 'Password must contain at least 8 characters']
    },
    roles: {
        type: Array,
        required: true,
        default: ['author']
    }
});

export const userModel = mongoose.model('blog-user', blogUserSchema);
export const articleModel = mongoose.model('blog-article', articlesSchema);