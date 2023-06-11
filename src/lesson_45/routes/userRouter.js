const Router = require('express');
const router = new Router();
const controller = require('../controllers/userController');

router.post('/users', controller.createUser);
router.get('/users', controller.getUsers);
router.get('/users/:id', controller.getOneUser);
router.put('/users/:id', controller.updateUser);
router.delete('/users/:id', controller.deleteUser);

module.exports = router;
