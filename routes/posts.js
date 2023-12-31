const express = require('express');
const router = express.Router();

// Load model
const Post = require('../models/Post');

// Hien thi form de tao bai viet moi
router.get('/add', (req, res) => {
  res.render('posts/add'); // cái đường dẫn vô đứng từ app.js nó tự vào cấp con là /view nhưng k thấy add.handlebars phải dẫn nó qua cấp con nữa là /post
});

// Tao post moi
router.post('/', async (req, res) => {
  const { title, text } = req.body;

  let errors = [];

  if (!title) errors.push({ msg: 'Title required ' });
  if (!text) errors.push({ msg: 'Text required ' });
  if (errors.length > 0) res.render('post/add', { title, text });
  else {
    const newPostData = { title, text };
    const newPost = new Post(newPostData);
    await newPost.save();
    res.redirect('/posts');
  }
});

// Hien thi tat ca cac bai viet
router.get('/', async (req, res) => {
  const posts = await Post.find().lean().sort({ date: -1 });
  res.render('posts/index', { posts });
});

// Hien thi form de nguoi dung thay doi bai viet
router.get('/edit/:id', async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id }).lean();
  res.render('posts/edit', { post });
});

// Cap nhat bai viet moi vao co so du lieu
router.put('/:id', async (req, res) => {
  const { title, text } = req.body;
  await Post.findOneAndUpdate({ _id: req.params.id }, { title, text });
  res.redirect('/posts');
});

// Xoa bai viet
router.delete('/:id', async (req, res) => {
  const { title, text } = req.body;
  await Post.findOneAndRemove({ _id: req.params.id }, { title, text });
  res.redirect('/posts');
});

module.exports = router;
