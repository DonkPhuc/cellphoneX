import { acceptHMRUpdate, defineStore } from 'pinia';

import Services from '~/home/services/Service';

import { Products } from '../dtos';

export const useStore = defineStore(
  'store',
  () => {
    async function getData() {
      return (await Services.getData()) as Products[];
    }
    async function getProduct(id: string) {
      return await Services.getProduct(id);
    }
    async function getSearchProducts(name: string) {
      return await Services.getSearchProducts(name);
    }
    async function postAddToCart(username: string, id: string) {
      return await Services.postAddToCart(username, id);
    }
    async function postRemoveCart(username: string, id: string) {
      return await Services.postRemoveCart(username, id);
    }
    async function postAddRate(
      data: { username: string; phoneNo: string; description: string; value: number },
      id: string
    ) {
      return await Services.postAddRate(data, id);
    }
    async function postDeleteProduct(id: string) {
      return await Services.postDeleteProduct(id);
    }
    async function postUpdateProduct(
      id: string,
      data: {
        imageLink: string;
        name: string;
        stock: number;
        priceRRP: number;
        discount: number;
        description: string;
        type: string;
      }
    ) {
      return await Services.postUpdateProduct(id, data);
    }
    async function postAddProduct(data: {
      imageLink: string;
      name: string;
      stock: number;
      priceRRP: number;
      discount: number;
      description: string;
      type: string;
    }) {
      return await Services.postAddProduct(data);
    }

    return {
      getData,
      getProduct,
      getSearchProducts,
      postRemoveCart,
      postAddToCart,
      postAddRate,
      postDeleteProduct,
      postUpdateProduct,
      postAddProduct,
    };
  },
  {
    persist: true,
  }
);
if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot));
