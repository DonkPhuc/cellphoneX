import { acceptHMRUpdate, defineStore } from 'pinia';

import Services from '~/home/services/Service';

import { Products } from '../dtos';
import { log } from 'console';

export const useStore = defineStore(
  'store',
  () => {
    const favrouteList = ref<Products[]>([]);

    async function getData() {
      const result = (await Services.getData()) as Products[];
      return result;
    }
    async function getProduct(id: string) {
      return await Services.getProduct(id);
    }
    async function getOrders(id?: string) {
      return await Services.getOrders(id);
    }
    async function postDeleteOrder(id: string) {
      return await Services.postDeleteOrder(id);
    }
    async function getSearchProducts(name: string) {
      return await Services.getSearchProducts(name);
    }
    async function postAddToCart(
      username: string,
      data: { _id: string; imageLink: string; priceRRP: number; discount: number; quantity: number }
    ) {
      return await Services.postAddToCart(username, data);
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
        imageDetail: [];
      }
    ) {
      return await Services.postUpdateProduct(id, data);
    }
    async function postUpdateToCart(
      id: string,
      data: {
        id: string;
        quantity: number;
      }[]
    ) {
      return await Services.postUpdateToCart(id, data);
    }
    async function postAddProduct(data: {
      imageLink: string;
      name: string;
      stock: number;
      priceRRP: number;
      discount: number;
      description: string;
      type: string;
      imageDetail: [];
    }) {
      return await Services.postAddProduct(data);
    }
    async function postAddOrder(data: {
      item: [];
      status: string;
      orderTotal: number;
      orderAddress: string;
      customerUsername: string;
      customerName: string;
      orderDelivery: string;
      orderNumber: string;
    }) {
      return await Services.postAddOrder(data);
    }
    async function postAddToFavourite(username: string, id: string) {
      const result = await Services.postAddToFavourite(username, id);
      if (result === 'successfully') {
        console.log('🚀 ~ file: Store.ts:97 ~ postAddToFavourite ~ result:', result);
      }
      return result;
    }

    return {
      favrouteList,
      getData,
      getProduct,
      getOrders,
      getSearchProducts,
      postRemoveCart,
      postAddToCart,
      postAddRate,
      postDeleteProduct,
      postUpdateProduct,
      postAddProduct,
      postDeleteOrder,
      postAddOrder,
      postUpdateToCart,
      postAddToFavourite,
    };
  },
  {
    persist: true,
  }
);
if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot));
