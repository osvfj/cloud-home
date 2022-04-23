const router = require('express').Router();
const { rename, move } = require('../controllers/dir.controller');
const { upload, getFile, download, deleteFile } = require('../controllers/files.controller');


router.get('/', getFile)
router.post('/upload', upload)
router.get('/download', download)
router.put('/rename', rename)
router.put('/move', move)
router.delete('/delete', deleteFile)

module.exports = router;