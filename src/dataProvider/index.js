import { default as axios } from '/src/services/AxiosInterceptor';
import { fantvInstance, rawInstance, strapiInstance } from './axios';

const fetchAxiosInstanceType = (type) => {
  switch (type) {
    case 'raw':
      return rawInstance;
    case 'strapi':
      return strapiInstance;
    case 'fantv':
      return fantvInstance;
    default:
      return axios;
  }
};

const fetcher = {
  /**
   * @function get To fetch a resource
   * @param {string} url api path
   * @param {object} paramConfigs axios parameters
   * @returns Promise
   */
  get: async (
    url,
    paramConfigs = {},
    axiosInstanceType = 'default',
    logConfigs = { log: false }
  ) => {
    const instance = fetchAxiosInstanceType(axiosInstanceType);
    if (logConfigs.log)
      console.log(`url=>${url} paramConfig=>${JSON.stringify(paramConfigs)}`);
    return instance
      .request({
        url,
        method: 'GET',
        ...paramConfigs,
      })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  },
  /**
   * @function post To create a resource
   * @param {string} url api path
   * @param {object} data Body to send
   * @param {object} paramConfigs axios parameters
   * @returns Promise
   */
  post: async (url, data, paramConfigs = {}, axiosInstanceType = 'default') => {
    const instance = fetchAxiosInstanceType(axiosInstanceType);
    return instance
      .request({
        url,
        method: 'POST',
        data,
        ...paramConfigs,
      })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  },
  /**
   * @function put To update a full data of resource
   * @param {string} url api path
   * @param {object} data Body to send
   * @param {object} paramConfigs axios parameters
   * @returns Promise
   */
  put: async (url, data, paramConfigs = {}, axiosInstanceType = 'default') => {
    const instance = fetchAxiosInstanceType(axiosInstanceType);
    return instance
      .request({
        url,
        method: 'PUT',
        data,
        ...paramConfigs,
      })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  },
  /**
   * @function patch To update partial data of a resource
   * @param {string} url api path
   * @param {object} data Body to send
   * @param {object} paramConfigs axios parameters
   * @returns Promise
   */
  patch: async (
    url,
    data,
    paramConfigs = {},
    axiosInstanceType = 'default'
  ) => {
    const instance = fetchAxiosInstanceType(axiosInstanceType);
    return instance
      .request({
        url,
        method: 'PATCH',
        data,
        ...paramConfigs,
      })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  },
  /**
   *@function delete To delete the resource
   * @param {*} url api path
   * @param {*} data Body to send
   * @param {*} paramConfigs axios parameters
   * @returns Promise
   */
  delete: async (url, paramConfigs = {}, axiosInstanceType = 'default') => {
    const instance = fetchAxiosInstanceType(axiosInstanceType);
    return instance
      .request({
        url,
        method: 'DELETE',
        ...paramConfigs,
      })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  },
  upload: async (url, formData, paramConfigs = {}, axiosInstanceType) => {
    const instance = fetchAxiosInstanceType(axiosInstanceType);
    return instance
      .request({
        url,
        method: 'PUT',
        data: formData,
        ...paramConfigs,
      })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  },
};

export default fetcher;
