import { plainToInstance } from 'class-transformer';
import { acceptHMRUpdate, defineStore } from 'pinia';

import { Products } from '~/home/dtos';

import PersonalSettingsService from '../services/user';

export const useUserStore = defineStore(
  'user',
  () => {
    const cart = ref<Products[]>([new Products()]);
    const currentProduct = ref<Products[]>([new Products()]);
    // const load = async () => {
    //   const data = await PersonalSettingsService.load();
    //   settings.value = plainToInstance(PersonalSetting, data);
    // };

    // const invokeUpdatePersonalSetting = async (key: SettingToggleKey, value: boolean) => {
    //   await PersonalSettingsService.update(key, value);
    // };

    // const toggle = (key: SettingToggleKey, value: boolean) => {
    //   const updatedKey = key.replace(/(?!^)_(.)/g, (_, char) => char.toUpperCase());
    //   settings.value = { ...settings.value, [updatedKey]: value };
    //   invokeUpdatePersonalSetting(key, value);
    // };

    return {
      cart,
      currentProduct,
    };
  },
  {
    persist: true,
  }
);
if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
