import 'react-native-gesture-handler/jestSetup';
jest.mock('react-native-keychain', () => ({ACCESSIBLE:{WHEN_UNLOCKED_THIS_DEVICE_ONLY:'AccessibleWhenUnlockedThisDeviceOnly'},getGenericPassword:jest.fn(async()=>false),setGenericPassword:jest.fn(async()=>true),resetGenericPassword:jest.fn(async()=>true)}));
jest.mock('react-native-mmkv', () => ({createMMKV:()=>({getString:jest.fn(),set:jest.fn(),remove:jest.fn()})}));
jest.mock('@react-native-community/netinfo',()=>({addEventListener:jest.fn(()=>jest.fn()),useNetInfo:()=>({isConnected:true}),refresh:jest.fn(),default:{addEventListener:jest.fn(()=>jest.fn()),refresh:jest.fn()}}));
