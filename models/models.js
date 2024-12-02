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
    sanitizedHTML: {
        type: String,
        required: true
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
    role: {
        type: String,
        required: true,
        default: 'admin'
    },
    articles: {
        type: [articlesSchema],
        required: true
    }
});

const blogModel = mongoose.model('blog', blogUserSchema, 'blog-user');

export default blogModel;