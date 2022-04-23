import axios from 'axios';

class API {
  constructor() {
    this.api = axios.create({
      baseURL: 'http://192.168.0.20:5000/api',
    });
  }

  async apiCall(request) {
    try {
      return (await request()).data;
    } catch (e) {
      return e.response.data;
    }
  }

  dir() {
    const get = async (path) =>
      await this.apiCall(() => this.api.get(`/dir/?path=${path}`));

    const deleteDir = async (path) =>
      await this.apiCall(() => this.api.delete(`/dir/delete?path=${path}`));

    const create = async (path, name) =>
      await this.apiCall(() => this.api.post(`/dir/create`, { path, name }));

    const move = async (path, newPath) =>
      await this.apiCall(() =>
        this.api.put(`/dir/move`, { path, dst: newPath })
      );

    const rename = async (path, name) =>
      await this.apiCall(() => this.api.put(`/dir/rename`, { path, name }));

    return {
      get,
      delete: deleteDir,
      create,
      move,
      rename,
    };
  }

  file() {
    const upload = async (path, files) => {
      return await this.apiCall(() =>
        this.api.post(`/files/upload?path=${path}`, files)
      );
    };

    const get = async (path) => {
      return await this.apiCall(() => this.api.get(`/files/?path=${path}`));
    };

    const deleteFile = async (path) => {
      return await this.apiCall(() =>
        this.api.delete(`/files/delete?path=${path}`)
      );
    };

    const rename = async (path, name) => {
      return await this.apiCall(() =>
        this.api.put(`/files/rename`, { path, name })
      );
    };

    const move = async (path, newPath) => {
      return await this.apiCall(() =>
        this.api.put(`/files/move`, { path, dst: newPath })
      );
    };

    const download = async (path) => {
      /* return await this.apiCall(() =>
        this.api.get(`/files/download?path=${path}`)
      ); */
      window.open(`http://192.168.0.20:5000/api/files/download?path=${path}`)
    };

    return {
      upload,
      get,
      delete: deleteFile,
      rename,
      move,
      download,
    };
  }
}

export default new API();
