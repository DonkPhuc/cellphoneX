import { acceptHMRUpdate, defineStore } from 'pinia';

import customerServices from '../services/user';

export const useUserStore = defineStore(
  'user',
  () => {
    const isLoginSuccess = ref('');
    const userFullName = ref('');

    async function getCustomer(params: string) {
      return await customerServices.getCustomer(params);
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
      id?: string
    ) {
      return await customerServices.postUpdateUser(userFullName, username, email, password, id);
    }

    return {
      isLoginSuccess,
      userFullName,
      getCustomer,
      getAllCustomers,
      postSignUp,
      postUpdateUser,
    };
  },
  {
    persist: true,
  }
);
if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
