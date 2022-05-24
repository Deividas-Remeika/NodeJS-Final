import cookieParser from 'cookie-parser'
import chalk from 'chalk'
import 'dotenv/config';
import express from 'express';
import path from 'path'
import users from './routes/api/users.js'
import blog from './routes/api/blog.js'
import home from './routes/ui/home.js'
import register from './routes/ui/register.js'
import login from './routes/ui/login.js';
import newblog from './routes/ui/addblog.js'
import user from './routes/ui/user.js'
import logout from './routes/ui/logout.js';

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
app.use('/register', register);
app.use('/login', login);
app.use('/addblog', newblog);
app.use('/logout', logout);
app.use('/user', user)
app.use('/:home?', home);

app.listen(PORT, console.log(chalk.green(`Server online on PORT: ${PORT}`))) 