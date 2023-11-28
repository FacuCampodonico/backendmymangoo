const { Router } = require('express');
const { getUsers, getSingleUser, newUser, deleteUser, updatingUser, logUser } = require('../controllers/controller');

const router = Router();

router.get('/user', getUsers)

router.get('/user/:id', getSingleUser)

router.post('/user', newUser)

router.delete('/user/:id', deleteUser)

router.put('/user/:id', updatingUser)

router.post('/login', logUser)

module.exports = router;