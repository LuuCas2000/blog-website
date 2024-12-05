import mongoose from 'mongoose';
import { marked } from 'marked';
import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
const dompurify = createDOMPurify(new JSDOM().window);
import slugify from 'slugify';

const  articlesSchema =  new mongoose.Schema({
    title:  {
        type: String,
        required: true,
        unique: false
    },
    description: {
        type: String,
        required: false
    },
    markdown: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        required: true,
        unique: true
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

articlesSchema.pre('validate', function(next) {
    if (this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true });
    }

    if (this.markdown) {
        this.sanitizedHTML = dompurify.sanitize(marked.parse(this.markdown));
    }
    next();
});

export const userModel = mongoose.model('blog-user', blogUserSchema);
export const articleModel = mongoose.model('blog-article', articlesSchema);