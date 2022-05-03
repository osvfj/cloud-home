import axios from 'axios';

class API {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      headers: {
        authorization: localStorage.getItem('ACCT'),
      },
    });
  }

  async apiCall(request) {
    try {
      return (await request()).data;
    } catch (e) {
      if (e.response.status === 401) {
        try {
          const { data } = await this.api.get('/auth/refresh', {
            headers: {
              'x-refresh-token': localStorage.getItem('RFT'),
            },
          });

          if (data.accessToken !== undefined) {
            localStorage.setItem('ACCT', data.accessToken);
            localStorage.setItem('RFT', data.refreshToken);
          }

          this.api = axios.create({
            baseURL: import.meta.env.VITE_API_URL,
            headers: {
              authorization: localStorage.getItem('ACCT'),
            },
          });

          return (await request()).data;
        } catch (e) {
          if(e.response.status === 500){
            localStorage.clear()
            window.history.go('/login')
          }
        }
      }
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
        this.api.put(`/dir/move?path=${path}&dst=${newPath}`)
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
        this.api.put(`/files/move?path=${path}&dst=${newPath}`)
      );
    };

    const download = async (path) => {
      window.open(`${import.meta.env.VITE_API_URL}/files/download?path=${path}&token=${localStorage.getItem('ACCT')}`);
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

  auth() {
    const login = async (formData) =>
      await this.apiCall(async () => {
        const data = await this.api.post('/auth/login', formData);
        this.api = axios.create({
          baseURL: import.meta.env.VITE_API_URL,
          headers: {
            authorization: data.data.accessToken,
          },
        });
        return data;
      });

    return {
      login,
    };
  }
}

export default new API();
