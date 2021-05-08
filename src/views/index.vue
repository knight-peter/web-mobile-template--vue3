<template>
  <div>
    <com-test></com-test>
  </div>
</template>

<script>
import { ComTest } from '../components';
// 微前端全局状态操作
import actions from '../shared/actions';

export default {
  name: 'Test',
  components: { ComTest },
  data() {
    return {};
  },

  methods: {},

  mounted() {
    /**
     * 微前端qiankun框架,非微前端项目可删除
     * 注册观察者函数
     * onGlobalStateChange 第二个参数为 true，表示立即执行一次观察者函数
     * state是全局数据
     */
    actions.onGlobalStateChange((state) => {
      // eslint-disable-next-line no-console
      console.log({ state });
    }, true);
  },
};
</script>

<style lang="scss" module></style>
