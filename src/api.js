/* eslint-disable no-unused-vars */
import { service } from '@biaodian-web/basic';

const {
  axiosService: {
    biaodianApiInstance,
    biaodianConfig, // 修改获取token等相关配置
    biaodianApiFetch,
  },
  apolloService: { gql, tokenConfig: apolloTokenConfig, biaodianGraphqlClient: Client },
} = service;
const { baseURL } = window.config;
biaodianApiInstance.defaults.baseURL = baseURL;

const apolloClient = new Client({
  base: 'http://localhost:8087',
  uri: '/v2/graphql',
});
