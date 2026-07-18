import {createMMKV} from 'react-native-mmkv';

const storage = createMMKV({id: 'enterprise.preferences'});
export const preferences = {
  get: (key: string) => storage.getString(key),
  set: (key: string, value: string) => storage.set(key, value),
  remove: (key: string) => storage.remove(key),
};
