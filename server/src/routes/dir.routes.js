const router = require('express').Router();

const {
  getDirData,
  move,
  createDir,
  rename,
  deleteDir,
} = require('../controllers/dir.controller');

router.get('/', getDirData);
router.put('/move', move);
router.post('/create', createDir);
router.put('/rename', rename);
router.delete('/delete', deleteDir);

module.exports = router;
