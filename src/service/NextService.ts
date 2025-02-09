import {Chapter, PaginationProps, Series, Teacher} from '@src/constants/t';
import {MD5} from 'crypto-js';
import BaseService from './BaseService';

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
    let result = await this.instance.get(`/init/selectChapter.do`, {
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
    let result = await this.instance.get(`/demo/uuid.do`, {
      params: {},
    });
    return result.data;
  }

  async mergeTeacher(t: Teacher) {
    let result = await this.instance.post(`/init/mergeTeacher.do`, t);
    return result.data;
  }

  async mergeSeries(s: Series) {
    let result = await this.instance.post(`/init/mergeSeries.do`, s);
    return result.data;
  }

  async mergeChapter(c: Chapter) {
    let result = await this.instance.post(`/init/mergeChapter.do`, c);
    return result.data;
  }

  async selectTeachers() {
    let result = await this.instance.get(`/init/selectTeachers.do`);
    return result.data;
  }

  async selectSerieses() {
    let result = await this.instance.get(`/init/selectSerieses.do`);
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
