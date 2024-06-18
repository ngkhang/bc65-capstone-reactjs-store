/**
 * Retrieves a value from local storage by the specified key.
 *
 * @param {string} key - The key name
 * @return {string} The value associated with the key, or empty string if the key does not exist.
 */
const getDataTextStorage = (key) => {
  return localStorage.getItem(key) ? localStorage.getItem(key) : '';
};

/**
 * Retrieves and parses a JSON value from local storage by the specified key.
 *
 * @param {string} key - The key name
 * @return {* | null} The parsed value associated with the key, or null if the key does not exist.
 */
const getDataJsonStorage = (key) => {
  return localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key))
    : null;
};

/**
 * Sets a text value in local storage by the specified key.
 *
 * @param {string} key - The key name
 * @param {string} value - The value to store
 */
const setDataTextStorage = (key, value) => {
  localStorage.setItem(key, value);
};

/**
 * Sets an object value in local storage by the specified key.
 *
 * @param {string} key - The key name
 * @param {object} value - The value to store
 */
const setDataJSONStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export {
  getDataTextStorage,
  getDataJsonStorage,
  setDataTextStorage,
  setDataJSONStorage,
};
