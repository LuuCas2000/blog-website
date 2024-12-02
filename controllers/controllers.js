import bcrypt from 'bcrypt';

// IMPORTS
import blogModel from "../models/models.js";

export const main = (req, res) => {
    res.render('index');
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
        await blogModel.create({ username, password: hashedPassword, role: roles });
        res.redirect('/user/login');
    } catch (err) {
        console.log(err.message);
    }
};

// USER LOGIN SYSTEM
export const userLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await blogModel.findOne({ username });
        
        const isUserValid = bcrypt.compareSync(password, user.password);
       
        if (isUserValid) {
            res.redirect('/')
        } else {
            throw new Error('incorrect credentials');
        }
        
    } catch (err) {
        console.log(err.message);
    }
};

// CREATE NEW ARTICLE SYSTEM
export const createArticlePage = async (req, res) => {
    const user = await blogModel.findOne({ username: "Novyshane" });
    console.log(user);
    res.render('create-article', { user });
}

export const createArticle = async (req, res) => {
    const { title, description, markdown } = req.body;
    await blogModel.findOneAndUpdate({ username: "Novyshane" }, { $addToSet: { articles: { title, description, markdown } } }, { runValidators: true });
    res.redirect('/');
}