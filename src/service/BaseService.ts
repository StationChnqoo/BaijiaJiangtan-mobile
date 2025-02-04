import {useCaches} from '@src/constants/store';
import axios, {AxiosInstance} from 'axios';
import Config from 'react-native-config';

export default class BaseService {
  instance: AxiosInstance = null;

  constructor() {
    this.instance = axios.create({
      // baseURL: Config.SERVER,
      baseURL: Config.SERVICE,
      timeout: 10000,
      headers: {
        token: useCaches.getState().token || '',
      },
    });
    this.instance.interceptors.response.use(response => {
      return response;
    });
  }
}
