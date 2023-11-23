const { Router } = require('express');
const { getUsers, getSingleUser, newUser, deleteUser, updatingUser } = require('../controllers/controller');

const router = Router();

router.get('/user', getUsers)

router.get('/user/:id', getSingleUser)

router.post('/user', newUser)

router.delete('/user/:id', deleteUser)

router.put('/user/:id', updatingUser)

module.exports = router;