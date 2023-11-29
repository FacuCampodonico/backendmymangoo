const { Router } = require('express');
const { getUsers, getSingleUser, newUser, deleteUser, updatingUser, logUser, verify } = require('../controllers/controller');
const validInfo = require("../middleware/validInfo")
const authorization = require("../middleware/authorization")

const router = Router();

router.get('/user', getUsers)

router.get('/user/:id', getSingleUser)

router.post('/user',validInfo, newUser)

router.delete('/user/:id', deleteUser)

router.put('/user/:id', updatingUser)

router.post('/login',validInfo, logUser)

router.get('/is-verify',authorization, verify)

module.exports = router;