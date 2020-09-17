const express = require('express');
const catchErrors = require('../handlers/errorhandler');
const blogController = require('../controllers/blogController');
const postsController = require('../controllers/postController');
const authController = require('../controllers/authController');
const isLoggedIn = require('../middlewares/loginRequired');
const appRouter = express.Router();

appRouter.get('/posts', blogController.getAllBlogPosts);
// appRouter.post('/posts/new', postsController.addNewPost) //isLoggedIn
appRouter.post('/posts/upload', postsController.uploadPost); //isLoggedIn
appRouter.get('/posts/:postId', blogController.getPostById);
appRouter.get('/posts/updateLike/:postId', blogController.incrementLike);
appRouter.get(
  '/posts/getcomments/:postId',
  blogController.getAllCommentsByPostId
);
appRouter.post('/posts/updatecomments/', blogController.insertComment);
appRouter.delete('/posts/:postId', isLoggedIn, blogController.deletePostbyId);
appRouter.put('/posts/:postId/', isLoggedIn, blogController.editPostById);
appRouter.post('/auth/signup/', authController.signUp);
appRouter.post('/auth/signin', authController.signIn);

module.exports = appRouter;
