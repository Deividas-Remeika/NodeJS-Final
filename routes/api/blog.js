import express from 'express'
import connect from '../../mysqlConnect.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const [data] = await connect.query("SELECT*FROM blogs.blog")
    res.send(data)
  } catch (err) {
    res.send({ err: `Klaida: ${err}` })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const [data] = await connect.query(`SELECT * FROM blogs.blog WHERE id= ?`, [req.params.id])
    if (data.length === 0) {
      res.send("Blogas ID")
    } else {
      res.send(data)
    }

  } catch (err) {
    res.send({ err: `Klaida: ${err}` })
  }
})

export default router 