export const DOMAIN = 'https://apistore.cybersoft.edu.vn';

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
    /**
     * Send the user's order
     *
     * @description Sends a POST request to get the user's order.
     */
    ORDER: `${USER_BASE}/order`,
    /**
     * Update the user's profile
     *
     * @description Sends a POST request to update the user's profile.
     */
    UPDATE_PROFILE: `${USER_BASE}/updateProfile`,
    /**
     * Update the user's password
     *
     * @description Sends a POST request to update the user's password.
     */
    CHANGE_PASSWORD: `${USER_BASE}/changePassword`,
  },
};

export default API;
