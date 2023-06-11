const Router = require('express');
const router = new Router();
const controller = require('../controllers/tokenController');

router.post('/tokens', controller.createToken);
router.get('/tokens', controller.getTokensByUser);
router.delete('/tokens/:id', controller.deleteToken);

module.exports = router;
