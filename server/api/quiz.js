const { Question, Choice } = require('../db/models')
const router = require('express').Router()

router.get('/', async (req, res, next) => {
  try {
    const questions = await Question.findAll({
      include: [{ model: Choice }]
    })

    res.json(questions)
  } catch (err) { next(err) }
})

module.exports = router
