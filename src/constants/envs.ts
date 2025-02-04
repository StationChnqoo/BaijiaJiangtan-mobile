import {EnvKeys} from './t';

export default class Envs {
  package: 'debug' | 'release';
  variables = {
    debug: {
      // 192.168.0.103
      // http://localhost:3000
      [EnvKeys.HOST]: 'http://192.168.31.247:3000',
    },
    release: {
      [EnvKeys.HOST]: 'https://service.cctv3.net',
    },
  };
  constructor() {
    this.package = __DEV__ ? 'debug' : 'release';
  }
  get(key: EnvKeys) {
    return this.variables[this.package][key];
  }
}
