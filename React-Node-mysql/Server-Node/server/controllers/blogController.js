const Posts = require('../models/postmodel');
const {response} = require('express');

const dbconnnectivity = require('../dbconnection');

exports.getAllBlogPosts = async (req, res) => {
  dbconnnectivity.query('SELECT * FROM posts', function (err, result) {
    if (err) res.status(500).send({error: 'Something Worng'});
    if (result) {
      res.json({res: result});
    }
  });
};

exports.addNewPost = async (req, res) => {
  const {title, text} = req.body;
  if (!title || !text) {
    res.json({
      message: 'Post not created, fill in post title and post text',
      success: false,
    });
  }
  const post = await Posts.create(req.body);
  res.json({
    post: post,
    message: 'Post created successfully',
    success: true,
  });
};

exports.getPostById = async (req, res) => {
  const postid = req.params.postId;
  dbconnnectivity.query(
    `SELECT * FROM posts where postid='${postid}'`,
    function (err, result) {
      if (err) res.status(500).send({error: 'Something Worng'});
      if (result) {
        res.json({res: result});
        // console.log(result);
      }
    }
  );
};

exports.getAllCommentsByPostId = async (req, res) => {
  const postid = req.params.postId;
  // console.log(postid + ' asdfdfs');
  dbconnnectivity.query(
    `SELECT * FROM comments where postid='${postid}'`,
    function (err, result) {
      if (err) res.status(500).send({error: 'Something Worng'});
      if (result) {
        res.json(result);
      }
    }
  );
};

exports.incrementLike = async (req, res) => {
  const postid = req.params.postId;
  dbconnnectivity.query(
    `update posts set countlike = countlike+1 where postid='${postid}'`,
    function (err, result) {
      if (err) res.status(500).send({error: 'Something Worng'});
      if (result) {
        res.json(result);
        // console.log(result);
      }
    }
  );
};

exports.insertComment = async (req, res) => {
  // console.log(req);
  const {id, comment, commentid} = req.body;
  // console.log(id, comment, commentid);

  dbconnnectivity.query(
    `insert into comments (postid,commenttext,commentusername) values ('${id}','${comment}','${commentid}')`,
    function (err, result) {
      if (err) result.status(500).send({error: 'Something Worng'});

      dbconnnectivity.query(
        `update posts set countcomment = countcomment+1 where postid = '${id}'`,
        function (err, re) {
          if (err) res.status(500).send({error: 'Something Worng'});
          if (re) {
            res.json({
              commentinsert: 'true',
              commentincrease: 'true',
            });
          }
        }
      );
    }
  );
};

exports.deletePostbyId = async (req, res) => {
  const postId = req.params.postId;
  const deletedPost = await Posts.findByIdAndRemove(postId);
  if (deletedPost) {
    res.json({
      message: 'Post deleted successfully',
      success: true,
    });
  }
};

exports.editPostById = async (req, res) => {
  const postId = req.params.postId;
  const {text, title} = req.body;
  const post = await Posts.findOne({_id: postId});
  if (!post) {
    res.json({
      message: 'Post not found!',
      success: false,
    });
  }
  post.title = title || post.title;
  post.text = text || post.text;
  await post.save();
  res.json({
    message: 'Post updated successfully',
    success: false,
  });
};

exports.uploadPost = async (req, res) => {
  const postId = req.params.postId;
  const {text, title} = req.body;
  const post = await Posts.findOne({_id: postId});
  if (!post) {
    res.json({
      message: 'Post not found!',
      success: false,
    });
  }
  post.title = title || post.title;
  post.text = text || post.text;
  await post.save();
  res.json({
    message: 'Post updated successfully',
    success: false,
  });
};
