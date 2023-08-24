const express = require('express');
const router = express.Router();

// Load model
const Post = require('../models/Post');

// Test
router.get('/add', (req, res) => {
  res.render('posts/add'); // cái đường dẫn vô đứng từ app.js nó tự vào cấp con là /view nhưng k thấy add.handlebars phải dẫn nó qua cấp con nữa là /post
});

module.exports = router;
