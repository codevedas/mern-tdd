import {Router} from "express"
const messageApp = require('./controller.js')
const router = Router()

router.get('/', async (req, res) => {
  await messageApp.getAll()
  .then((messages) => res.json(messages))
  .catch((err) => res.status(404).json(err))
})

router.post('/message', async (req, res) => {
  await messageApp.post(req.body.content)
  .then((messages) => {
    res.json(messages)
  })
  .catch((err) => res.status(404).json(err))
})

export default router
