const fs = require('fs').promises;

const { request, response } = require('express');
const { HOME_DIR_CLOUD } = require('../config');

const getDirData = async (req = request, res = response) => {
  const path = (req.query.path ??= '/');

  const content = {
    files: [],
    folders: [],
  };

  let TYPE;
  (function (TYPE) {
    TYPE[(TYPE['image'] = 'image')] = 'image';
    TYPE[(TYPE['video'] = 'video')] = 'video';
    TYPE[(TYPE['audio'] = 'audio')] = 'audio';
    TYPE[(TYPE['pdf'] = 'pdf')] = 'pdf';
    TYPE[(TYPE['default'] = 'default')] = 'defualt';
  })(TYPE || (TYPE = {}));

  try {
    const dir = await fs.opendir(`${HOME_DIR_CLOUD}/${path}`);
    for await (const dirent of dir) {
      const pathStats = await fs.stat(`${HOME_DIR_CLOUD}/${path}`);
      if (dirent.isDirectory()) {
        content.folders.push({
          name: dirent.name,
          size: pathStats.size,
          created_at: pathStats.birthtime,
          last_time_opened: pathStats.mtime,
        });
      } else {
        const file = {
          name: dirent.name,
          size: pathStats.size,
          created_at: pathStats.birthtime,
          last_time_opened: pathStats.mtime,
        };

        const ext = dirent.name.split('.').pop();
        switch (ext) {
          case 'jpg':
          case 'png':
          case 'jpeg':
            file['type'] = TYPE.image;
            break;

          case 'mp4':
            file['type'] = TYPE.video;
            break;

          case 'mp3':
          case 'm4a':
            file['type'] = TYPE.audio;
            break;

          case 'pdf':
            file['type'] = TYPE.pdf;
            break;

          default:
            file['type'] = TYPE.defualt;
        }

        content.files.push(file);
      }
    }

    res.json(content);
  } catch (error) {
    res.status(404).json({ error: 'This dir does not exist' });
  }
};

const move = async (req = request, res = response) => {
  const { path, dst } = req.query || req.body;
  //move file
  try {
    await fs.rename(
      `${HOME_DIR_CLOUD}/${path}`,
      `${HOME_DIR_CLOUD}/${dst}/${path.split('/').pop()}`
    );
    res.json({ message: 'File moved successfully' });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const rename = async (req = request, res = response) => {
  const { name, path } = (req.body ||= req.query);

  try {
    const stats = await fs.lstat(`${HOME_DIR_CLOUD}/${path}`);

    if (stats.isDirectory()) {
      await fs.rename(
        `${HOME_DIR_CLOUD}/${path}`,
        `${HOME_DIR_CLOUD}/${path.split('/').slice(0, -1).join('/')}/${name}`
      );
      return res.json({ message: 'Dir renamed successfully' });
    }

    const ext = `.${path?.split('.').pop()}`;

    await fs.rename(
      `${HOME_DIR_CLOUD}/${path}`,
      `${HOME_DIR_CLOUD}/${path
        .split('/')
        .slice(0, -1)
        .join('/')}/${name}${ext}`
    );

    res.json({ message: 'File renamed successfully' });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const createDir = async (req = request, res = response) => {
  const { name, path } = req.body || req.query;
  try {
    await fs.mkdir(`${HOME_DIR_CLOUD}/${path}/${name}`);
    res.json({ message: 'Directory created successfully' });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deleteDir = async (req = request, res = response) => {
  const { path } = req.query || req.body;
  try {
    await fs.rm(`${HOME_DIR_CLOUD}/${path}`, { recursive: true, force: true });
    res.json({ message: 'Dir deleted successfully' });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getDirData,
  move,
  createDir,
  rename,
  deleteDir,
};
