import BaseService, { METHODS } from '~/common/services/BaseService';

class Services extends BaseService {
  constructor(prefix: string) {
    super(prefix);
  }

  async getData() {
    return await this.performRequest(METHODS.GET, '');
  }
  async getProduct(id: string) {
    return await this.performRequest(METHODS.GET, `${id}`);
  }
  async getSearchProducts(name: string) {
    return await this.performRequest(METHODS.GET, `search/${name}`);
  }
  async postAddToCart(username: string, id: string) {
    return await this.performRequest(METHODS.POST, `cart/${username}`, {
      _id: id,
    });
  }
  async postRemoveCart(username: string, id: string) {
    return await this.performRequest(METHODS.DELETE, `cart/delete/${username}/${id}`);
  }
  async postAddRate(data: { username: string; phoneNo: string; description: string; value: number }, id: string) {
    return await this.performRequest(METHODS.POST, `rate/${id}`, data);
  }
  async postDeleteProduct(id: string) {
    return await this.performRequest(METHODS.DELETE, `delete/${id}`);
  }
  async postUpdateProduct(
    id: string,
    data?: {
      imageLink: string;
      name: string;
      stock: number;
      priceRRP: number;
      discount: number;
      description: string;
      type: string;
      imageDetail: [];
    }
  ) {
    return await this.performRequest(METHODS.POST, `update/${id}`, data);
  }
  async postAddProduct(data?: {
    imageLink: string;
    name: string;
    stock: number;
    priceRRP: number;
    discount: number;
    description: string;
    type: string;
    imageDetail: [];
  }) {
    return await this.performRequest(METHODS.POST, `add`, data);
  }
}
export default new Services('v1/api/product');
