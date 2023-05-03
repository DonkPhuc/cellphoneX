import { acceptHMRUpdate, defineStore } from 'pinia';

import Services from '~/home/services/Service';

export const useStore = defineStore(
  'store',
  () => {
    function getData() {
      const result = Services.getData();
      result.forEach((e) => {
        e.price = e.priceRRP - e.priceRRP * (e.discount / 100);
      });
      return result;
    }

    return {
      actions: {
        getData,
      },
    };
  },
  {
    persist: true,
  }
);
if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot));
