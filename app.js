import cookieParser from 'cookie-parser'
import chalk from 'chalk'
import 'dotenv/config';
import express from 'express';
import path from 'path'
import users from './routes/api/users.js'
import blog from './routes/api/blog.js'
import pageui from './routes/ui/home.js'
import register from './routes/ui/register.js'

const app = express();
const PORT = process.env.PORT1 || 8000;

app.set('views', path.join('views'));
app.set('view engine', 'ejs')

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}))
app.use(cookieParser())
app.use(express.static('public'))
app.use('/api/users', users)
app.use('/api/blog', blog)
app.use('/home', pageui)
app.use('/register', register);

app.listen(PORT, console.log(chalk.green(`Server online on PORT: ${PORT}`))) 