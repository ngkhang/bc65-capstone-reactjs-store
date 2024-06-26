import { useDispatch, useSelector } from 'react-redux';

/**
 * Custom hook for managing Redux state and dispatch.
 *
 * @param {string} reducerName - The name of the Redux reducer.
 * @param {string} [globalState='state'] - The key for the global state object (defaults to 'state').
 * @returns {Object} An object containing the selected state and the dispatch function.
 */
const useRedux = (reducerName, globalState = 'state') => {
  const state = useSelector((state) => state[reducerName]);
  const dispatch = useDispatch();

  return {
    [globalState]: globalState === 'state' ? state : state[globalState],
    dispatch,
  };
};

export default useRedux;
