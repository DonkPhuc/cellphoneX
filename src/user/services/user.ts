import BaseService, { METHODS } from '~/common/services/BaseService';

class customerServices extends BaseService {
  constructor(prefix: string) {
    super(prefix);
  }

  async getCustomers() {
    return await this.performRequest(METHODS.GET, 'customer');
  }
  async postSignUp(username: string, password: string) {
    return await this.performRequest(METHODS.POST, 'customer', { username, password });
  }
}

export default new customerServices('v1/api');
