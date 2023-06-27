import { acceptHMRUpdate, defineStore } from 'pinia';

import { Customers } from '../dtos/Customers.dto';
import customerServices from '../services/user';

export const useUserStore = defineStore(
  'user',
  () => {
    const isLoginSuccess = ref('');
    const userFullName = ref('');
    const stepPayment = ref(0);
    const favrouteList = ref([]);

    async function getCustomer(params: string) {
      const result = (await customerServices.getCustomer(params)) as Customers;
      favrouteList.value = result.favorite;
      return result;
    }
    async function getAllCustomers() {
      return await customerServices.getAllCustomers();
    }
    async function postSignUp(username: string, password: string, userFullName: string, email: string) {
      return await customerServices.postSignUp(username, password, userFullName, email);
    }
    async function postUpdateUser(
      userFullName?: string,
      username?: string,
      email?: string,
      password?: string,
      id?: string,
      role?: string
    ) {
      return await customerServices.postUpdateUser(userFullName, username, email, password, id, role);
    }
    async function postDeleteCustomer(id: string) {
      return await customerServices.postDeleteCustomer(id);
    }
    async function postAddToFavourite(username: string, id: string) {
      const result = await customerServices.postAddToFavourite(username, id);
      if (result === 'successfully') {
        const item = { _id: id };
        console.log('🚀 ~ file: Store.ts:98 ~ postAddToFavourite ~ item:', item);
      } else {
        console.log('🚀 :', favrouteList.value);
      }
      return result;
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
    };
  },
  {
    persist: true,
  }
);
if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
