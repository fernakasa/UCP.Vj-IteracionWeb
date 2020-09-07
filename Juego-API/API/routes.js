const Router  = require('express');
const router = Router();

const {sumar, webvj, webdatos} = require('./controller');

router.get('/sumar/:punto', sumar);
router.get('/', webvj);
router.get('/datos', webdatos);

module.exports = router;