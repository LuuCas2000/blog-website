# blog-website

In this project, a user can perform the following actions:

- Sign in & Sign up account
- Log out account
- Create, Read, Update and Delete their own articles
- Update their account informations

Endpoints for each actions:

- **/user/create** (create a new user account)
- **/user/login** (log in a user account)
- **/user/logout** (log out a user account)
- **/articles/:article-identifier** (read an article)
- **/article/new** (create a new article, "a user can access this endpoint after signing in its account")
- **/article/edit/:article-identifier** (edit an article, "a user must be the article's author in order to edit it")
- **/article/delete/:article-identifier** (delete an article, "a user must be the article' author in order to delete it")

Stacks & NPM packages used in this project:
- NodeJS
- MongoDB
- mongoose
- bcrypt
- cookie-parser
- dompurify
- dotenv
- ejs
- express
- express-validator
- helmet
- jsdom
- jsonwebtoken
- marked
- method-override
- mongoose
- multer
- nodemon
- reading-time-estimator
- slugify
