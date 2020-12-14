import Axios from 'axios';

export const API_URLS = {
  local: 'http://localhost:3000/v2',
  prod: 'https://api.shoreshdavidbrandon.org/v2',
};

export type Env = 'local' | 'prod';

const token = localStorage.getItem('token');

const api = Axios.create({
  baseURL: API_URLS.prod,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});

class API {
  //
  // ======= Auth
  //

  public async login(email: string, password: string) {
    try {
      const res = await api.post('/auth', { email, password });

      return { data: res.data };
    } catch (error) {
      const message = error?.response?.data?.message || error?.message;
      return { error: message };
    }
  }

  public async getResources() {
    try {
      const res = await api.get('/resources');

      return { data: res.data.data };
    } catch (error) {
      const message = error?.response?.data?.message || error?.message;
      return { error: message };
    }
  }

  public async getResourceById(resourceId: string) {
    try {
      const res = await api.get(`/resources/${resourceId}`);

      return { data: res.data.data.resource};
    } catch (error) {
      const message = error?.response?.data?.message || error?.message;
      return { error: message };
    }
  }

  // Events

  public async getEvents() {
    try {
      const res = await api.get('/events');

      return { data: res.data.data };
    } catch (error) {
      const message = error?.response?.data?.message || error?.message;
      return { error: message };
    }
  }

  public async getEventById(eventId: string) {
    try {
      const res = await api.get(`/events/${eventId}`);

      return { data: res.data.data.event};
    } catch (error) {
      const message = error?.response?.data?.message || error?.message;
      return { error: message };
    }
  }

  // Sermons

  public async getSermons() {
    try {
      const res = await api.get('/sermons');

      return { data: res.data.data };
    } catch (error) {
      const message = error?.response?.data?.message || error?.message;
      return { error: message };
    }
  }

  public async getSermonById(sermonId: string) {
    try {
      const res = await api.get(`/sermons/${sermonId}`);

      return { data: res.data.data.sermon};
    } catch (error) {
      const message = error?.response?.data?.message || error?.message;
      return { error: message };
    }
  }

}

export const Api = new API();
