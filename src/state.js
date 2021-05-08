import Vue from 'vue';
import { Toast } from 'vant';

const state = Vue.observable({});

/** 处理接口请求错误 */
export function handleApiError(err) {
  if (err && err.response) {
    const { config, response } = err;
    const { url } = config || {};
    const { statusText } = response;
    Toast.error(`${url || ''} ${statusText || '请求失败'}`);
  } else {
    Toast.error('请求失败');
  }
  // eslint-disable-next-line no-console
  console.table(err);
}

const mutations = {};

export { state, mutations };
