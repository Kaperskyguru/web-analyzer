const INITIALKEY = "web__";
class Storage {
  static getAll() {
    return Object.keys(localStorage)
      .filter((key) => key.startsWith(INITIALKEY))
      .map((key) => JSON.parse(localStorage[key]));
  }
  static get(key) {
    const item = JSON.parse(window.localStorage.getItem(INITIALKEY + key));
    return item;
  }
  static store(key, payload) {
    window.localStorage.setItem(INITIALKEY + key, JSON.stringify(payload));
    return payload;
  }
  static delete(key) {
    window.localStorage.removeItem(INITIALKEY + key);
    return true;
  }
  static resetAll() {
    for (let i = 0, len = window.localStorage.length; i < len; i++) {
      const key = window.localStorage.key(i);
      console.log(key, i);
      if (key && key.startsWith(INITIALKEY)) {
        window.localStorage.removeItem(key);
      }
    }
  }
}
export default Storage;
