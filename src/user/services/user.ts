import BaseService, { METHODS } from '~/common/services/BaseService';

class CustomerServices extends BaseService {
  constructor(prefix: string) {
    super(prefix);
  }

  async getCustomer(params: string) {
    return await this.performRequest(METHODS.GET, `customer/${params}`);
  }
  async getAllCustomers() {
    return await this.performRequest(METHODS.GET, `customer`);
  }
  async postSignUp(username: string, password: string, userFullName: string, email: string) {
    return await this.performRequest(METHODS.POST, 'customer/add', { username, password, userFullName, email });
  }
  async postUpdateUser(
    userFullName?: string,
    username?: string,
    email?: string,
    password?: string,
    id?: string,
    role?: string
  ) {
    return await this.performRequest(METHODS.POST, `customer/update/${id}`, {
      userFullName,
      username,
      email,
      password,
      role,
    });
  }
  async postDeleteCustomer(id: string) {
    return await this.performRequest(METHODS.DELETE, `customer/delete/${id}`);
  }
  async postAddToFavourite(username: string, id: string) {
    return await this.performRequest(METHODS.POST, `product/favorite/${username}`, { _id: id });
  }
  async postDelToFavourite(username: string, id: string) {
    return await this.performRequest(METHODS.DELETE, `product/favorite/delete/${username}/${id}`);
  }
}

export default new CustomerServices('v1/api');
