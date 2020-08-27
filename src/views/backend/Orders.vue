<template>
  <div>
    <Loading :active.sync="isLoading" />
    <div class="container mt-4">
      <div class="d-flex justify-content-between">
        <h1 class="h3">訂單管理</h1>
      </div>
      <table class="table mt-3">
        <thead>
          <tr>
            <th>下單時間</th>
            <th>購買款項</th>
            <th>付款方式</th>
            <th>應付金額</th>
            <th>是否付款</th>
          </tr>
        </thead>
        <tbody v-if="orders.length">
          <tr v-for="(item, idx) in orders" :key="idx">
            <td>{{ item.created.datetime }}</td>
            <td>
              <ul class="list-unstyled">
                <li v-for="(product, i) in item.products" :key="i">
                  {{ product.product.title }} 數量：{{ product.quantity }}
                  {{ product.product.unit }}
                </li>
              </ul>
            </td>
            <td>{{ item.payment }}</td>
            <td class="text-right">{{ item.amount | currency }}</td>
            <td>
              <div class="custom-control custom-switch">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  :id="item.id"
                  v-model="item.paid"
                  @change="setOrderPaid(item)"
                >
                <label
                  class="custom-control-label"
                  :for="item.id"
                >
                  <strong
                    v-if="item.paid"
                    class="text-success"
                  >已付款</strong>
                  <span
                    v-else
                    class="text-muted"
                  >尚未付款</span>
                </label>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination :pages="pagination" @updateList="getOrders()"/>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';

export default {
  name: 'Orders',
  data() {
    return {
      orders: {},
      pagination: {},
      isLoading: false,
    };
  },
  components: {
    Pagination,
  },
  created() {
    this.getOrders();
  },
  methods: {
    getOrders(page = 1) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/orders?page=${page}`;

      this.axios.get(api).then((res) => {
        this.orders = res.data.data;
        this.pagination = res.data.meta.pagination;
        this.isLoading = false;
      }).catch(() => {
        this.isLoading = false;
      });
    },
    setOrderPaid(item) {
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/orders/${item.id}/paid`;

      if (!item.paid) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/orders/${item.id}/unpaid`;
      }

      this.axios.patch(api, item.id).then(() => {
        this.$bus.$emit('message:push', '訂單狀態修改成功', 'success');
        this.getOrders();
      });
    },
  },
};
</script>
