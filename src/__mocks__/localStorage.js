export class LocalStorageMock {
  constructor(mockStore) {
    this.store = mockStore || {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
};

global.localStorage = new LocalStorageMock({
  chuck: JSON.stringify({
    dates: {
      '2017-01-01': { items: [] }
    }
  })
});