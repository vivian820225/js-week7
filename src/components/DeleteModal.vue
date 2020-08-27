<template>
  <div
    class="modal fade"
    id="delModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="delModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 class="modal-title" id="delModalLabel">刪除產品</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body d-flex">
          是否刪除
          <strong class="text-danger ellipsis itemTitle">
            <font v-if="!item.title">{{ item.id }}</font>
            <font v-else>{{ item.title }}</font>
          </strong>（刪除後將無法恢復）。
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
          <button type="button" class="btn btn-danger" @click="delData()">確認刪除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */

export default {
  name: 'DeleteModal',
  data() {
    return {};
  },
  props: ['item', 'isProduct', 'isCoupon'],
  methods: {
    getDelData() {
      $('#delModal').modal('show');
    },
    delData() {
      let api = '';
      let msg = '';

      if (this.isProduct) {
        // Products
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/product/${this.item.id}`;
        msg = '商品刪除成功';
      } else if (this.isCoupon) {
        // Coupons
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/coupon/${this.item.id}`;
        msg = '優惠券刪除成功';
      } else {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/storage/${this.item.id}`;
        msg = '圖片刪除成功';
      }

      this.axios.delete(api).then(() => {
        $('#delModal').modal('hide');
        this.$bus.$emit('message:push', msg, 'success');
        this.$emit('updateList');
      }).catch(() => {
        $('#delModal').modal('hide');
        this.$bus.$emit('message:push',
          '發生錯誤！請連絡相關人員處理',
          'danger');
      });
    },
  },
};
</script>

<style lang="scss">
  .itemTitle {
    display: inline-block;
    max-width: 120px;
    margin-left: 10px;
  }
</style>
