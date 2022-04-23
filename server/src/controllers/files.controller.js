const fs = require('fs').promises;

const { request, response } = require('express');
const { HOME_DIR_CLOUD } = require('../config');

const upload = async (req, res) => {
  let files = req.files.files;
  const { path } = req.query || req.body;

  !Array.isArray(files) && (files = [files]);

  files.forEach((file) => {
    const filePath = `${HOME_DIR_CLOUD}/${path}/${file.name}`;
    file.mv(filePath);
  });

  res.json({
    message: 'File uploaded successfully',
  });
};

const getFile = async (req = request, res = response) => {
  const { path } = req.query || req.body;
  const filePath = `${HOME_DIR_CLOUD}/${path}`;

  if (!path) res.json({ msg: 'No path specified' });

  res.sendFile(filePath);
};

const download = async (req = request, res = response) => {
  const { path } = req.query;
  const filePath = `${HOME_DIR_CLOUD}/${path}`;

  if (!path) res.json({ msg: 'No path specified' });

  res.download(filePath);
};

const deleteFile = async (req = request, res = response) => {
  const { path } = req.query || req.body;
  const filePath = `${HOME_DIR_CLOUD}/${path}`;

  if (!path) res.json({ msg: 'No path specified' });

  try {
    await fs.unlink(filePath);
    res.json({ message: 'File deleted successfully' });
  } catch (error) {
    res.status(404).json({ error: 'File not found' });
  }
};

module.exports = {
  upload,
  getFile,
  download,
  deleteFile,
};
