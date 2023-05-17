import BaseService, { METHODS } from "~/common/services/BaseService";

class Services extends BaseService {
  constructor(prefix: string) {
    super(prefix);
  }

  async getData() {
    return await this.performRequest(METHODS.GET, "");
  }
  async getProduct(id: string) {
    return await this.performRequest(METHODS.GET, `${id}`);
  }
  async postAddToCart(username: string, id: string) {
    return await this.performRequest(METHODS.POST, `cart/${username}`, {
      _id: id,
    });
  }
  async postRemoveCart(username: string, id: string) {
    return await this.performRequest(
      METHODS.DELETE,
      `cart/delete/${username}/${id}`
    );
  }
  async postAddRate(
    data: { username: string; description: string; value: number },
    id: string
  ) {
    return await this.performRequest(METHODS.POST, `rate/${id}`, data);
  }
}
export default new Services("v1/api/product");
