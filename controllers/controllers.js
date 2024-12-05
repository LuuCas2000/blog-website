import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { readingTime } from 'reading-time-estimator';

// IMPORTS
import { userModel, articleModel } from "../models/models.js";

export const main = async (req, res) => {
    const articles = await articleModel.find().sort({ createdAt: 'desc' });
    res.render('index', { articles });
};

export const userLoginPage = (req, res) => {
    res.render('user-login');
};

export const createUserPage = (req, res) => {
    res.render('user-create');
};

// CREATE USER ACCOUNT SYSTEM
export const createUser = async (req, res) => {
    try {
        const { username, password, roles } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 10);
        await userModel.create({ username, password: hashedPassword, role: roles });
        res.redirect('/user/login');
    } catch (err) {
        console.log(err.message);
    }
};

// USER LOGIN SYSTEM
export const userLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userModel.findOne({ username });
        
        const isUserValid = bcrypt.compareSync(password, user.password);

        if (!isUserValid) return res.status(401).json({ msg: 'incorrect credentials' });

        // GENERATE TOKEN
        const accessToken = jwt.sign({ username: user.username, id: user._id, roles: user.roles }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('access-token', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 1000 // 1h
        });

        res.redirect('/');

    } catch (err) {
        console.log(err.message);
    }
};

// LOGOUT USER SYSTEM
export const logOutUser = async (req, res) => {
    const token = req.cookies['access-token'];
    const { username } = jwt.verify(token, process.env.JWT_SECRET);

    const foundUser = await userModel.findOne({ username });

    if (foundUser) {
        res.clearCookie('access-token', {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        })
    };

    return res.redirect('/')
}

// CREATE NEW ARTICLE SYSTEM
export const createArticlePage = async (req, res) => {
    res.render('create-article');
};

export const createArticle = async (req, res) => {
    const { title, description, markdown } = req.body;
    const token = req.cookies['access-token'];

    const { username, id } = jwt.verify(token, process.env.JWT_SECRET);

    await articleModel.create({ title, description, markdown, createdBy: username, userId: id, image: req.file?.originalname });
    res.redirect('/');
};

export const readingPage = async (req, res) => {
    const token = req.cookies['access-token'];
    const articles = await articleModel.findOne({ slug: req.params.slug });

    const reading = readingTime(articles.markdown, 300);

    if (!token) {
        const user = {
            roles: ['']
        };

        return res.render('article-read', { articles, user, reading });
    } else {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        return res.render('article-read', { articles, user });
    }
};

export const articleDelete = async (req, res) => {
    await articleModel.findByIdAndDelete(req.params.id);
    res.redirect('/')
};

export const articleEditPage = async (req, res) => {
    const article = await articleModel.findOne({ _id: req.params.id });
    res.render('article-edit', { article });
};

export const articleEdit = async (req, res) => {
    const { title, description, markdown } = req.body;
    const article = await articleModel.findByIdAndUpdate(req.params.id);

    let editedArticle = article;
    editedArticle.title = title;
    editedArticle.description = description;
    editedArticle.markdown = markdown;
    editedArticle = await editedArticle.save();
    res.redirect('/')
};