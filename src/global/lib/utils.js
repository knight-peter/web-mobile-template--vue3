/* 兼容ssr的provide */
export function createProvider(funcs) {
  return {
    install(app) {
      funcs.forEach((func) => {
        !func.injectKey && (func.injectKey = Symbol('functional store'));
        app.provide(func.injectKey, func());
      });
    },
  };
}
