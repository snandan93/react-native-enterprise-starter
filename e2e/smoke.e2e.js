describe('Authentication', () => {
  beforeAll(async () => device.launchApp({delete: true}));
  it('shows login', async () => expect(element(by.id('login-screen'))).toBeVisible());
});
