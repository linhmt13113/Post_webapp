const express = require('express');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');

const connectDB = require('./config/db');
const posts = require('./routes/posts');

// Khoi dong app (express)
const app = express();

// Khoi dong Handlebars middleware
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

// Khoi dong bodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Khoi dong express middleware
app.use(express.json());

// ket noi co so du lieu
connectDB();

// Mot so routes co ban, co the dua vao file rieng trong thu muc routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});

// mang routes vao de su dung
app.use('/posts', posts);

const PORT = 5000;

app.listen(PORT, () => console.log(`Server started at post ${PORT}`));
