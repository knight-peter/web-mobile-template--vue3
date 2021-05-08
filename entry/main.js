/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import { createStore } from "vuex";
import "./public-path";
import actions from "../src/shared/actions";

import App from "./App";

const { appName } = require("../package.json");

let instance = null;
let router = null;

const app = createApp(App);

/**
 * 渲染函数
 * 两种情况：主应用生命周期钩子中运行 / 微应用单独启动时运行
 */
async function render(props) {
  if (props) {
    // 注入 actions 实例
    actions.setActions(props);
  }
  const { registerStore, registerComponent, registerRoute } = await import(
    "../src"
  );

  if (registerComponent) {
    const componentMap = await registerComponent();

    Object.keys(componentMap).forEach((key) => {
      const { component, options } = componentMap[key];
      app.use(component, ...(options || []));
    });
  }

  if (registerStore) {
    const modules = await registerStore();
    const store = createStore({ modules });
    app.use(store);
  }
  // 在 render 中创建 VueRouter，可以保证在卸载微应用时，移除 location 事件监听，防止事件污染
  if (registerRoute) {
    const routeMap = await registerRoute();
    const routes = Object.keys(routeMap).map((key) => routeMap[key]);
    router = createRouter({
      // 运行在主应用中时，添加路由命名空间 /vue
      history: createWebHashHistory(
        window.__POWERED_BY_QIANKUN__ ? `/${appName}/` : "/"
      ),
      routes,
    });
    app.use(router);
  }

  // 挂载应用
  const { container } = props || {}; // 为了避免根 id #app 与其他的 DOM 冲突，需要限制查找范围
  instance = app.mount(
    container ? container.querySelector("#selfApp") : "#selfApp"
  );
}

// 独立运行时，直接挂载应用
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap() {
  console.log("VueMicroApp bootstraped");
}

/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props) {
  console.log("VueMicroApp mount", props);
  render(props);
}

/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount() {
  console.log("VueMicroApp unmount");
  instance.unmount();
  instance = null;
  router = null;
}
