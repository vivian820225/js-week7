<template>
  <div id="app">
    <Toast />
    <router-view/>
  </div>
</template>
<script>
import Toast from '@/components/Toast.vue';

export default {
  name: 'App',
  data() {
    return {
    };
  },
  components: {
    Toast,
  },
};
</script>

<style lang="scss">
  @import './assets/scss/all.scss';
</style>
