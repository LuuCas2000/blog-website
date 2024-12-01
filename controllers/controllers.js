import blogModel from "../models/models.js";

export const main = (req, res) => {
    res.render('index');
};

export const createUserPage = (req, res) => {
    res.render('user-create');
};

export const createUser = async (req, res) => {
    const { username, password } = req.body;
    await blogModel.create({ username, password });
    res.redirect('/');
};