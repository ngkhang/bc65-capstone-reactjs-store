export const DOMAIN = 'https://apistore.cybersoft.edu.vn';
export const ACCESS_TOKEN = 'accessToken';
export const USER_LOGIN = 'userLogin';

const PRODUCT_BASE = '/api/Product';
const USER_BASE = '/api/Users';

const API = {
  PRODUCT: {
    /**
     * Gets all product
     */
    GET_ALL: PRODUCT_BASE,
    /**
     * Gets the product by keyword
     *
     * @param {string} keyword - The keyword to search for.
     * @returns {string} The URL API.
     */
    GET_BY_KEYWORD: (keyword) => `${PRODUCT_BASE}?keyword=${keyword}`,
    /**
     * Gets the product by ID
     *
     * @param {string|number} id - The ID to search for.
     * @returns {string} The URL API
     */
    GET_BY_ID: (id) => `${PRODUCT_BASE}/getbyid?id=${id}`,
  },
  USER: {
    /**
     * Signs up the user.
     *
     * @description Sends a POST request to sign up the user.
     */
    SIGNUP: `${USER_BASE}/signup`,
    /**
     * Signs in the user.
     *
     * @description Sends a POST request to sign in the user.
     */
    SIGNIN: `${USER_BASE}/signin`,
    /**
     * Gets the user's profile
     *
     * @description Sends a POST request to get the user's profile.
     */
    PROFILE: `${USER_BASE}/getProfile`,
  },
};

export default API;
