import express from 'express';

// IMPORTS
import { main, createUserPage, createUser } from '../controllers/controllers.js';

const router = express.Router();

router.route('/')
.get(main);

router.route('/user/create')
.get(createUserPage);

router.route('/user/create')
.post(createUser);

export default router;