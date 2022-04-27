const router = require('express').Router();
const { rename, move } = require('../controllers/dir.controller');
const {
  upload,
  getFile,
  download,
  deleteFile,
} = require('../controllers/files.controller');
const authorization = require('../middlewares/authorization');

router.get('/', [authorization], getFile);
router.post('/upload', [authorization], upload);
router.get('/download', [authorization], download);
router.put('/rename', [authorization], rename);
router.put('/move', [authorization], move);
router.delete('/delete', [authorization], deleteFile);

module.exports = router;
