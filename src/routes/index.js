import { tools } from '@biaodian-web/basic';
const { getComponentCreator } = tools;
const getComponent = (target) => getComponentCreator(() => require(`../views/${target}`))();

const routes = [
  {
    path: '/test',
    name: 'test',
    component: () => getComponent('index'),
  },
];

const routesMap = {};
routes.forEach((item) => {
  const { name } = item;
  routesMap[name] = item;
});

export default routesMap;
