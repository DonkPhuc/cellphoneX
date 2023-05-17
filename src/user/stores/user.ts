import { plainToInstance } from 'class-transformer';
import { acceptHMRUpdate, defineStore } from 'pinia';

import { Products } from '~/home/dtos';

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

    return {
      isLoginSuccess,
      userFullName,
      getCustomer,
      getAllCustomers,
      postSignUp,
    };
  },
  {
    persist: true,
  }
);
if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
