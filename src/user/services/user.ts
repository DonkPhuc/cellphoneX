import BaseService, { METHODS } from '~/common/services/BaseService';

class PersonalSettingsService extends BaseService {
  constructor(prefix: string) {
    super(prefix);
  }

  // load() {
  //   return this.performRequest<PersonalSetting>(METHODS.GET, '');
  // }

  // update(key: SettingToggleKey, value: boolean) {
  //   return this.performRequest<PersonalSetting>(METHODS.POST, 'update', {
  //     key,
  //     value,
  //   });
  // }
}

export default new PersonalSettingsService('configs/settings');
