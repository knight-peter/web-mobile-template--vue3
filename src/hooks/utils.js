import { provide, inject } from 'vue';

//由于inject函数只会从父组件开始查找，所以useProvider默认返回hook函数的调用结果，以防同组件层级需要使用
/* export function useProvider(func) {
  !func.injectKey && (func.injectKey = Symbol('functional store'));
  const depends = func();
  provide(func.injectKey, depends);
  return depends;
} */

// 可以一次传入多个hook函数， 统一管理
export function useProviders(...funcs) {
  funcs.forEach((func) => {
    !func.injectKey && (func.injectKey = Symbol('functional store'));
    provide(func.injectKey, func());
  });
}

//对原生inject进行封装

// type InjectType = 'root' | 'optional';

//接收第二个参数，'root'表示直接全局使用；optional表示可选注入，防止父组件的provide并未传入相关hook
export function useInjector(func, type) {
  const injectKey = func.injectKey;
  const root = func.root;

  switch (type) {
    case 'optional':
      return inject(injectKey) || func.root || null;
    case 'root':
      if (!func.root) func.root = func();
      return func.root;
    default:
      if (inject(injectKey)) {
        return inject(injectKey);
      }
      if (root) return func.root;
      throw new Error(`状态钩子函数${func.name}未在上层组件通过调用useProvider提供`);
  }
}
