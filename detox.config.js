module.exports = {
  testRunner: {args: {$0: 'jest', config: 'e2e/jest.config.js'}},
  apps: {'ios.debug': {type: 'ios.app', binaryPath: 'ios/build/Build/Products/Debug-iphonesimulator/EnterpriseStarter.app', build: 'xcodebuild -workspace ios/EnterpriseStarter.xcworkspace -scheme EnterpriseStarter -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build'}},
  devices: {simulator: {type: 'ios.simulator', device: {type: 'iPhone 16'}}},
  configurations: {'ios.sim.debug': {device: 'simulator', app: 'ios.debug'}},
};
