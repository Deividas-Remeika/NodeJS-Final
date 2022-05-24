import express from "express";
import connect from "../../mysqlConnect.js";


const router = express.Router()

router.get('/', async (req, res) => {
  try {
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


    const [data] = await connect.query(`SELECT blog.id,blog.title,blog.content FROM blogs.blog ORDER BY ${isrikiuotiPagal} ${isrikiavimoTvarka}`);
    res.render('home', { blogs: data })
  } catch (err) {
    res.send({ err: `Error: ${err}` })
  }
})


export default router 