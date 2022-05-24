import express from "express";
import isAuth from '../../isAuth.js';
import connect from "../../mysqlConnect.js";

const router = express.Router()

router.get('/', async (req, res) => {
  try {

    const auth = await isAuth(req)
    let isrikiuotiPagal = req.query.isrikiuotiPagal;
    let isrikiavimoTvarka = req.query.isrikiavimas;

    if (isrikiuotiPagal === undefined || isrikiuotiPagal === "null") {
      isrikiuotiPagal = "id"
    } else {
      isrikiuotiPagal = req.query.isrikiuotiPagal
    }

    if (isrikiavimoTvarka === "mazejanti") {
      isrikiavimoTvarka = "DESC"
    } else {
      isrikiavimoTvarka = "ASC"
    }

    const [data] = await connect.query(`
    SELECT 
      blog.id,
      blog.title,
      blog.content 
      FROM blogs.blog JOIN user ON user.id=blog.author_id WHERE author_id=${req.token.id} ORDER BY ${isrikiuotiPagal} ${isrikiavimoTvarka}`);
    res.render('ui', { blogs: data, auth: auth, token: req.token })
  } catch (err) {
    res.send({ err: `Klaida: ${err}` })
  }
})

export default router