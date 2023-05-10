import { acceptHMRUpdate, defineStore } from 'pinia';

import Services from '~/home/services/Service';

import { Products } from '../dtos';

export const useStore = defineStore(
  'store',
  () => {
    async function getData() {
      return await Services.getData();
    }
    async function postAddToCart(username: string, id: string) {
      return await Services.postAddToCart(username, id);
    }
    async function postRemoveCart(username: string, id: string) {
      return await Services.postRemoveCart(username, id);
    }

    return {
      getData,
      postRemoveCart,
      postAddToCart,
    };
  },
  {
    persist: true,
  }
);
if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot));
