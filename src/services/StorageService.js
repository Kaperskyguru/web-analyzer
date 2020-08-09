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
    Object.keys(localStorage).forEach((key) => {
      if (key && key.startsWith(INITIALKEY)) delete localStorage[key];
    });
  }
}
export default Storage;
