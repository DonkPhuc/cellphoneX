import BaseService, { METHODS } from '~/common/services/BaseService';

class Services extends BaseService {
  constructor(prefix: string) {
    super(prefix);
  }

  async getData() {
    return await this.performRequest(METHODS.GET, 'product');
  }
  async getProduct(id: string) {
    return await this.performRequest(METHODS.GET, `product/${id}`);
  }
  async getOrders(id?: string) {
    if (id) {
      return await this.performRequest(METHODS.GET, `order/${id}`);
    } else {
      return await this.performRequest(METHODS.GET, `order`);
    }
  }
  async getSearchProducts(name: string) {
    return await this.performRequest(METHODS.GET, `product/search/${name}`);
  }
  async postAddToCart(username: string, id: string) {
    return await this.performRequest(METHODS.POST, `product/cart/${username}`, {
      _id: id,
    });
  }
  async postRemoveCart(username: string, id: string) {
    return await this.performRequest(METHODS.DELETE, `product/cart/delete/${username}/${id}`);
  }
  async postAddRate(data: { username: string; phoneNo: string; description: string; value: number }, id: string) {
    return await this.performRequest(METHODS.POST, `product/rate/${id}`, data);
  }
  async postDeleteOrder(id: string) {
    return await this.performRequest(METHODS.DELETE, `order/delete/${id}`);
  }
  async postDeleteProduct(id: string) {
    return await this.performRequest(METHODS.DELETE, `product/delete/${id}`);
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
    return await this.performRequest(METHODS.POST, `product/update/${id}`, data);
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
    return await this.performRequest(METHODS.POST, `product/add`, data);
  }
}
export default new Services('v1/api');
