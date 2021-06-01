export const globalHookKeyMap = {
  test: Symbol('test'),
};

export const globalHooks = {
  [globalHookKeyMap.test]: () => {},
};
