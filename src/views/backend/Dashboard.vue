<template>
  <div>
    <Loading :active.sync="isLoading" />
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link to="/admin" class="navbar-brand">後台首頁</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-between" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link to="/admin/products" class="nav-link">商品管理</router-link>
          <router-link to="/admin/orders" class="nav-link">訂單管理</router-link>
          <router-link to="/admin/coupons" class="nav-link">優惠券列表</router-link>
          <router-link to="/admin/storage" class="nav-link">圖片列表</router-link>
        </div>
        <a href="#" @click.prevent="logout()">登出</a>
      </div>
    </nav>
    <router-view v-if="checkSuccess" :token="token"/>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      token: '',
      uuid: process.env.VUE_APP_UUID,
      checkSuccess: false,
      isLoading: false,
    };
  },
  created() {
    this.checkToken();
  },
  methods: {
    checkToken() {
      this.isLoading = true;
      // 取得 token 的 cookies
      this.token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
      this.axios.defaults.headers.common.Authorization = `Bearer ${this.token}`;

      const api = `${process.env.VUE_APP_APIPATH}/api/auth/check`;

      // eslint-disable-next-line
      this.axios.post(api, {'api_token': this.token}).then((res) => {
        if (res.data.success) {
          this.checkSuccess = true;
          this.isLoading = false;
        }
      }).catch(() => {
        this.$router.push('/login');
        this.$bus.$emit('message:push', '請先登入', 'warning');
        this.isLoading = false;
      });
    },
    logout() {
      // 清除存入 cookie 的 token
      document.cookie = 'token=; expired=;';
      this.$router.push('/login');
      this.$bus.$emit('message:push', '登出成功', 'success');
    },
  },
};
</script>
