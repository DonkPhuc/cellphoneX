import BaseService, { METHODS } from '~/common/services/BaseService';

class Services extends BaseService {
  constructor(prefix: string) {
    super(prefix);
  }

  async getData() {
    return await this.performRequest(METHODS.GET, '');
  }
  async postAddToCart(username: string, id: string) {
    return await this.performRequest(METHODS.POST, `cart/${username}/`, { _id: id });
  }
  async postRemoveCart(username: string, id: string) {
    return await this.performRequest(METHODS.DELETE, `cart/delete/${username}/${id}`);
  }
}
export default new Services('v1/api/product');
