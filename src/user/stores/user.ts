import { acceptHMRUpdate, defineStore } from 'pinia';

import { Customers } from '../dtos/Customers.dto';
import CustomerServices from '../services/user';

export const useUserStore = defineStore(
  'user',
  () => {
    const isLoginSuccess = ref('');
    const userFullName = ref('');
    const stepPayment = ref(0);
    const favrouteList = ref([]);

    async function getCustomer(params: string) {
      const result = (await CustomerServices.getCustomer(params)) as Customers;
      favrouteList.value = result.favorite;
      return result;
    }
    async function getAllCustomers() {
      return await CustomerServices.getAllCustomers();
    }
    async function postSignUp(username: string, password: string, userFullName: string, email: string) {
      return await CustomerServices.postSignUp(username, password, userFullName, email);
    }
    async function postUpdateUser(
      userFullName?: string,
      username?: string,
      email?: string,
      password?: string,
      id?: string,
      role?: string
    ) {
      return await CustomerServices.postUpdateUser(userFullName, username, email, password, id, role);
    }
    async function postDeleteCustomer(id: string) {
      return await CustomerServices.postDeleteCustomer(id);
    }
    async function postAddToFavourite(username: string, id: string) {
      return await CustomerServices.postAddToFavourite(username, id);
    }
    async function postDelToFavourite(username: string, id: string) {
      return await CustomerServices.postDelToFavourite(username, id);
    }

    return {
      favrouteList,
      isLoginSuccess,
      userFullName,
      stepPayment,
      getCustomer,
      getAllCustomers,
      postSignUp,
      postUpdateUser,
      postDeleteCustomer,
      postAddToFavourite,
      postDelToFavourite,
    };
  },
  {
    persist: true,
  }
);
if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
