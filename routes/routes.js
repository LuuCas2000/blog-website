import express from 'express';
import { body } from 'express-validator';

// IMPORTS
import { main, createUserPage, createUser, userLoginPage, userLogin, createArticlePage, createArticle, logOutUser, readingPage, articleDelete, articleEditPage, articleEdit } from '../controllers/controllers.js';
import validateInput from '../input-validation.js';
import verifyUserRole from '../authUser.js';
import { upload } from '../multer-config.js'

const router = express.Router();

// INDEX PAGE
router.route('/')
.get(main);

// CREATE USER ACCOUNT SYSTEM
router.route('/user/create')
.get(createUserPage);

router.route('/user/create')
.post(validateInput([
    body('username').notEmpty().withMessage('username field must not be empty').trim().escape(),
    body('password').notEmpty().isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches('[0-9]').withMessage('Password must contain a number')
    .matches('[A-Z]').withMessage('Password must contain an uppercase letter').trim().escape(),
    body('roles').trim().escape()
]), createUser);

router.route('/user/login')
.get(userLoginPage);

// USER LOGIN SYSTEM
router.route('/user/login')
.post(userLogin);

// CREATE ARTICLE SYSTEM
router.route('/article/new')
.get(verifyUserRole('author', 'admin'), createArticlePage);

router.route('/article/new')
.post(validateInput([
    body('title').trim().escape(),
    body('description').trim().escape(),
    body('markdown').trim().escape()
]), upload.single('image_cover'), createArticle);

// LOGOUT USER SYSTEM
router.route('/user/logout')
.get(logOutUser);


// ARTICLE READ PAGE
router.route('/articles/:slug')
.get(readingPage);

// ARTICLE DELETE
router.route('/articles/:id')
.delete(articleDelete);

// ARTICLE EDIT
router.route('/article/edit/:id')
.get(articleEditPage);

router.route('/article/edit/:id')
.patch(articleEdit);

export default router; 