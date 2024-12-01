import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import path from 'path';

dotenv.config({ path: './config.env' });

// IMPORTS
import router from './routes/routes.js';
import connectDB from './database/database.js';

const app = express();

// VIEWS SETTING
app.set('view engine', 'ejs');
app.use(express.static(path.join(import.meta.dirname, 'views')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());

const port = process.env.PORT;
const db = process.env.DATABASE_URL.replace('<password>', process.env.DATABASE_PASSWORD);

const DB = async () => {
    await connectDB(db);
};

DB().catch(err => console.log(err));

app.use('/', router);

app.listen(port, ()=> console.log(`Server is running on port ${port}`));