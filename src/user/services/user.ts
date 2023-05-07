import BaseService, { METHODS } from '~/common/services/BaseService';

class customerServices extends BaseService {
  constructor(prefix: string) {
    super(prefix);
  }

  async getCustomers() {
    return await this.performRequest(METHODS.GET, 'customer');
  }
}

export default new customerServices('v1/api');
