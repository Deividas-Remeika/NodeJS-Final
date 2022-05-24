import express from 'express';
import connect from '../../mysqlConnect.js';
import auth from '../../auth.js'

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    res.render('addblog')
  } catch (err) {
    res.send({ err: `Klaida: ${err}` })
  }
})

router.post("/", auth, async (req, res) => {
  try {
    let title = req.body.title;
    let content = req.body.content;

    if (title === "") {
      res.send('Privalote nurodytį dienoraščio pavadinimą')
    }
    else if (content === "") {
      res.send('Privalote įrašyti tekstą')
    } else {
      const data = await connect.query(`INSERT INTO blogs.blog SET ?`, {
        author_id: req.token.id,
        title: title,
        content: content
      })
      res.redirect('/user')
    }
  } catch (err) {
    res.send({ err: `Klaida: ${err}` })
  }
})

router.delete("/blogs/:id", async (req, res) => {
  try {
    const data = await connect.query(`DELETE FROM blogs.blog WHERE id =?`, [req.params.id])
    res.send(data)
  } catch (err) {
    res.send({ err: `Klaida: ${err}` })
  }
})

export default router 