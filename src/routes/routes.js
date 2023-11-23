const { Router } = require('express');
const { getUsers, getSingleUser, newUser, deleteUser, updatingUser } = require('../controllers/controller');

const router = Router();

router.get('/user', getUsers)

router.get('/user/10', getSingleUser)

router.post('/user', newUser)

router.delete('/user', deleteUser)

router.put('/user', updatingUser)

module.exports = router;