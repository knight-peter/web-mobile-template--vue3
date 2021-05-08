/* eslint-disable no-console */
function emptyAction() {
  // 警告：提示当前使用的是空 Action
  console.warn('目前全局状态为空!');
}

class Actions {
  // 默认值为空 Action
  actions = {
    onGlobalStateChange: emptyAction,
    setGlobalState: emptyAction,
  };

  /**
   * 设置 actions,在render函数中实现
   */
  setActions(actions) {
    this.actions = actions;
  }

  /**
   * 注册观察者函数，获取微前端全局状态globalState
   */
  onGlobalStateChange(...args) {
    return this.actions.onGlobalStateChange(...args);
  }

  /**
   * 修改globalState
   */
  setGlobalState(...args) {
    return this.actions.setGlobalState(...args);
  }
}

const actions = new Actions();
export default actions;
