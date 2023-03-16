import { createContext, useMemo, useContext } from 'react';
import PropTypes from 'prop-types';

import WorldTimeApiClient from '../../utils/WorldTimeApiClient';

/**
 * Create context to store a WorldTimeApiClient instance that can then be accessed via hooks.
 */
const ApiClientContext = createContext();

/**
 * Context provider to be added at app root.
 */
const ApiClientProvidor = ({ children }) => {
  const apiClient = useMemo(() => new WorldTimeApiClient(), []);

  return (
    <ApiClientContext.Provider
      value={{
        apiClient
      }}
    >
      {children}
    </ApiClientContext.Provider>
  );
};

/**
 * PropTypes for ApiClientProvidor.
 */
ApiClientProvidor.propTypes = {
  children: PropTypes.node.isRequired
};

/**
 * ApiClientContext consumer hook.
 */
const useApi = () => useContext(ApiClientContext);

export { ApiClientProvidor, useApi };