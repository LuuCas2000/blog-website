# blog-website

In this project, a user can perform the following actions:

- Sign in & Sign up account
- Create, Read, Update and Delete their own articles
- Update their account informations

Endpoints for each actions:

- **/user/create** (create a new user account)
- **/user/login** (log in a user account)
- **/article/new** (create a new article, "a user can access this endpoint after signing in its account")
- **/article/edit/:article-identifier** (edit an article, "a user must be the article's author in order to edit it")
- **/article/delete/:article-identifier** (delete an article, "a user must be the article' author in order to delete it")
