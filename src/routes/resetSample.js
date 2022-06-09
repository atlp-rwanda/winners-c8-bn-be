import controller from "../controllers/passwordResetUser.sample"
const router = require('express').Router()

router
    .post('/', controller.createOne)
    // .post('/login', controller.login)

module.exports =router;