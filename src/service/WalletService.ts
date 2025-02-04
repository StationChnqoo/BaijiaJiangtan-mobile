import {Paths} from '@src/constants';
import BaseService from './BaseService';
import {PaginationProps} from '@src/constants/t';

class WalletService extends BaseService {
  constructor() {
    super();
  }
  async selectPlans(page: PaginationProps) {
    const result = await this.instance.get(`${Paths.walletPlan}/selectPlans`, {
      params: page,
    });
    return result.data;
  }

  async selectPlan(id: string) {
    const result = await this.instance.get(`${Paths.walletPlan}?id=${id}`);
    return result.data;
  }

  async insertPlan(data: any) {
    const result = await this.instance.post(Paths.walletPlan, data);
    return result.data;
  }

  async updatePlan(data: any) {
    const result = await this.instance.put(Paths.walletPlan, data);
    return result.data;
  }

  async deletePlan(id: string) {
    const result = await this.instance.delete(`${Paths.walletPlan}?id=${id}`);
    return result.data;
  }

  async selectCares(page: PaginationProps) {
    const result = await this.instance.get(`${Paths.walletCare}/selectCares`, {
      params: page,
    });
    return result.data;
  }

  async selectCare(id: string) {
    const result = await this.instance.get(`${Paths.walletCare}?id=${id}`);
    return result.data;
  }

  async insertCare(data: any) {
    const result = await this.instance.post(Paths.walletCare, data);
    return result.data;
  }

  async updateCare(data: any) {
    const result = await this.instance.put(Paths.walletCare, data);
    return result.data;
  }

  async deleteCare(id: string) {
    const result = await this.instance.delete(`${Paths.walletCare}?id=${id}`);
    return result.data;
  }

  async insertProperty(data: any) {
    const result = await this.instance.post(Paths.walletProperty, data);
    return result.data;
  }

  async deleteProperty(id: string) {
    const result = await this.instance.delete(
      `${Paths.walletProperty}?id=${id}`,
    );
    return result.data;
  }

  async selectProperty(id: string) {
    const result = await this.instance.get(`${Paths.walletProperty}?id=${id}`);
    return result.data;
  }

  async updateProperty(data: any) {
    const result = await this.instance.put(Paths.walletProperty, data);
    return result.data;
  }

  async selectProperties(page: PaginationProps) {
    const result = await this.instance.get(
      `${Paths.walletProperty}/selectProperties`,
      {
        params: {
          ...page,
          sort: JSON.stringify({settleDate: -1}),
        },
      },
    );
    return result.data;
  }
}

export default WalletService;
