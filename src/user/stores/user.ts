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

    function getData() {
      return customerServices.getCustomers();
    }

    return {
      cart,
      currentProduct,
      isLoginSuccess,
      getData,
    };
  },
  {
    persist: true,
  }
);
if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
