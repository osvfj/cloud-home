const router = require('express').Router();

const {
  getDirData,
  move,
  createDir,
  rename,
  deleteDir,
} = require('../controllers/dir.controller');
const authorization = require('../middlewares/authorization');

router.get('/', [authorization], getDirData);
router.put('/move', [authorization], move);
router.post('/create', [authorization], createDir);
router.put('/rename', [authorization], rename);
router.delete('/delete', [authorization], deleteDir);

module.exports = router;
