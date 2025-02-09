import {MD5, SHA256} from 'crypto-js';
import BaseService from './BaseService';
import {Jira, PaginationProps, Password, Property} from '@src/constants/t';

export default class NextService extends BaseService {
  constructor() {
    super();
  }

  async chapterStatusCount() {
    let result = await this.instance.get(`/init/statusCount.do`, {});
    return result.data;
  }

  async selectChaptersByStatus(params: {
    status: string;
    currentPage: number;
    pageSize: number;
  }) {
    let result = await this.instance.get(`/init/findByStatus.do`, {
      params,
    });
    return result.data;
  }

  async selectChapter(id: string) {
    let result = await this.instance.get(`/init/detail.do`, {
      params: {id},
    });
    return result.data;
  }

  async selectLogin(mobile: string, password: string) {
    let s = MD5(`${mobile}:${password}`);
    let result = await this.instance.get(`/share/login.do`, {
      params: {mobile, password, s},
    });
    return result.data;
  }

  async selectUUID() {
    let result = await this.instance.get(`/share/uuid.do`, {
      params: {},
    });
    return result.data;
  }

  async mergeJira(jira: Jira) {
    let result = await this.instance.post(`/mergeJira.do`, jira);
    return result.data;
  }

  async deleteJira(id: String) {
    let result = await this.instance.get(`/deleteJira.do`, {params: {id}});
    return result.data;
  }

  async deleteProperty(id: String) {
    let result = await this.instance.get(`/deleteProperty.do`, {params: {id}});
    return result.data;
  }

  async deletePassword(id: String) {
    let result = await this.instance.get(`/deletePassword.do`, {params: {id}});
    return result.data;
  }

  async mergeProperty(property: Property) {
    let result = await this.instance.post(`/mergeProperty.do`, property);
    return result.data;
  }

  async mergePassword(password: Password) {
    let result = await this.instance.post(`/mergePassword.do`, password);
    return result.data;
  }

  async selectJiras(page: PaginationProps) {
    let result = await this.instance.get(`/selectJiras.do`, {params: page});
    return result.data;
  }

  async selectPasswords(page: PaginationProps) {
    let result = await this.instance.get(`/selectPasswords.do`, {params: page});
    return result.data;
  }

  async selectJira(id: string) {
    let result = await this.instance.get(`/selectJira.do`, {params: {id}});
    return result.data;
  }

  async selectPassword(id: string) {
    let result = await this.instance.get(`/selectPassword.do`, {params: {id}});
    return result.data;
  }

  async selectProperty(id: string) {
    let result = await this.instance.get(`/selectProperty.do`, {params: {id}});
    return result.data;
  }

  async selectUser() {
    let result = await this.instance.get(`/selectUser.do`, {
      params: {},
    });
    return result.data;
  }

  async selectProperties(page: PaginationProps) {
    let result = await this.instance.get(`/selectProperties.do`, {
      params: page,
    });
    return result.data;
  }
}
