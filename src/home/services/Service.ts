import BaseService, { METHODS } from '~/common/services/BaseService';

class Services extends BaseService {
  constructor(prefix: string) {
    super(prefix);
  }

  async getData() {
    return await this.performRequest(METHODS.GET, 'product');
  }
}
export default new Services('v1/api');
