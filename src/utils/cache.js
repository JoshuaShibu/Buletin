// src/utils/cache.js

const cache = new Map();

const set = (key, value) => {
  cache.set(key, value);
};

const get = (key) => {
  return cache.get(key);
};

const clear = () => {
  cache.clear();
};

// eslint-disable-next-line
export default {
  set,
  get,
  clear,
};
