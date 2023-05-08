import { plainToInstance } from 'class-transformer';
import { acceptHMRUpdate, defineStore } from 'pinia';

import { Products } from '~/home/dtos';

import customerServices from '../services/user';

export const useUserStore = defineStore(
  'user',
  () => {
    const cart = ref<Products[]>([new Products()]);
    const currentProduct = ref<Products[]>([new Products()]);
    const isLoginSuccess = ref(false);

    async function getData() {
      return await customerServices.getCustomers();
    }
    async function postSignUp(username: string, password: string) {
      return await customerServices.postSignUp(username, password);
    }

    return {
      cart,
      currentProduct,
      isLoginSuccess,
      getData,
      postSignUp,
    };
  },
  {
    persist: true,
  }
);
if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
