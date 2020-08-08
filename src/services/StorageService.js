const INITIALKEY = "web__";
class Storage {
  static getAll() {
    return Object.keys(localStorage)
      .filter((key) => key.startsWith(INITIALKEY))
      .map((key) => JSON.parse(localStorage[key]));
  }
  static get(key) {
    const item = JSON.parse(window.localStorage.getItem(key));
    return item;
  }
  static post(key, payload) {
    window.localStorage.setItem(INITIALKEY + key, JSON.stringify(payload));
    return payload;
  }
  static delete(key) {
    window.localStorage.removeItem(INITIALKEY + key);
    return true;
  }
  static resetAll() {
    for (let i = 0; i <= window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (key.startsWith(INITIALKEY)) {
        window.localStorage.clear();
      }
    }
  }
}
export default Storage;
