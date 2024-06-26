import { useNavigate, useParams } from 'react-router-dom';

/**
 * Custom hook for managing route parameters and navigation.
 *
 * @param {string[]} keyParam - An array of parameter keys to extract from the URL.
 * @returns {Object} An object containing route parameters and the navigation function.
 */
const useRoute = (keyParam = []) => {
  const param = useParams();
  const navigate = useNavigate();
  const router = {
    param,
    navigate,
  };

  if (keyParam.length) {
    let listParam = {};
    keyParam.forEach((item) => {
      listParam[item] = param[item];
    });
    return {
      ...router,
      ...listParam,
    };
  }

  return router;
};

export default useRoute;
