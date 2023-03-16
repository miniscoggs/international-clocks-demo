import axios from 'axios';

/**
 * A class to make api calls to WorldTime's API.
 */
export default class WorldTimeApiClient {
  /**
   * Setup class with ability to override defaults if required.
   *
   * @param {Object} options - Configuration options.
   * @param {string} [options.base] - Override base url for WorldTime's API.
   */
  constructor(options = {}) {
    this.baseUrl = options.baseUrl || 'http://worldtimeapi.org/api/';

    if (this.baseUrl[this.baseUrl.length - 1] !== '/') {
      this.baseUrl += '/';
    }
  }

  /**
   * Get an axios cancel token to updating unmounted components
   *
   * @returns {Object} Object containing token anc cancellation function
   */
  getCancelToken() {
    return axios.CancelToken.source();
  }

  /**
   * Access timezones endpoint.
   *
   * @param {Object} cancelToken - cancel token for axios
   *
   * @return {axios} An axios promise chain instance
   */
  timezones(cancelToken) {
    return this.#makeRequest('GET', 'timezones', cancelToken);
  }

  /**
   * Access timezone endpoint
   *
   * @param {string} timezone - The timezone to fetch the time for
   * @param {Object} cancelToken - cancel token for axios
   *
   * @return {axios} An axios promise chain instance
   */
  timezone(timezone, cancelToken) {
    return this.#makeRequest('GET', `timezone/${timezone}`, cancelToken);
  }

  /**
   * Make actual request to WorldTimeApi
   *
   * @param {string} method - HTTP method for request
   * @param {string} path - path to be added to base url for request
   * @param {Object} cancelToken - CancelToken instance from getCancelToken function
   *
   * @return {axios} An axios promise chain instance
   */
  #makeRequest(method, path, cancelToken) {
    const requestConfig = {
      method,
      url: path,
      baseURL: this.baseUrl,
      headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
      },
      cancelToken: cancelToken.token
    }

    return axios(requestConfig).catch(error => {
      if (!axios.isCancel(error)) {
        throw error;
      }
    })
  }
}