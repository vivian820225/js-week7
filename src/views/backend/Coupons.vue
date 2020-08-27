<template>
  <div>
    <Loading :active.sync="isLoading" />
    <div class="container mt-4">
      <div class="d-flex justify-content-between">
          <h1 class="h3">優惠券列表</h1>
          <button
            type="button"
            class="btn btn-primary"
            @click="openCouponModal('created')"
            >
            建立新的優惠券
          </button>
      </div>

      <table class="table mt-3">
        <thead>
          <tr>
            <th>名稱</th>
            <th>折扣百分比</th>
            <th>到期日</th>
            <th>是否啟用</th>
            <th>編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in coupons" :key="i">
            <td>{{ item.title }}</td>
            <td>{{ item.percent }}</td>
            <td>{{ item.deadline.datetime }}</td>
            <td>
              <span
                v-if="item.enabled"
                class="text-success"
              >啟用</span>
              <span
                v-else
                class="text-muted"
              >未啟用</span>
            </td>
            <td>
              <div class="btn-group">
                <button
                  class="btn btn-outline-primary btn-sm"
                  @click="openCouponModal('edit', item)"
                >
                  編輯
                </button>
                <button
                  class="btn btn-outline-danger btn-sm"
                  @click="openCouponModal('delete', item)"
                >
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination :pages="pagination" @updateList="getCoupons()"/>
    </div>
    <!-- Coupon Modal -->
    <div
      id="couponModal"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="couponModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog"
        role="document"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5
              id="couponModalLabel"
              class="modal-title"
            >
              {{ status === 'created' ? '新增優惠卷' : '更新優惠券' }}
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="title">標題</label>
              <input
                id="title"
                v-model="tempCoupon.title"
                type="text"
                class="form-control"
                placeholder="請輸入標題"
              >
            </div>
            <div class="form-group">
              <label for="coupon_code">優惠碼</label>
              <input
                id="coupon_code"
                v-model="tempCoupon.code"
                type="text"
                class="form-control"
                placeholder="請輸入優惠碼"
              >
            </div>
            <div class="form-group">
              <label for="due_date">到期日</label>
              <input
                id="due_date"
                v-model="due_date"
                type="date"
                class="form-control"
              >
            </div>
            <div class="form-group">
              <label for="due_time">到期時間</label>
              <input
                id="due_time"
                v-model="due_time"
                type="time"
                step="1"
                class="form-control"
              >
            </div>
            <div class="form-group">
              <label for="price">折扣百分比</label>
              <input
                id="price"
                v-model="tempCoupon.percent"
                type="number"
                class="form-control"
                placeholder="請輸入折扣數量"
              >
            </div>
            <div class="form-group">
              <div class="form-check">
                <input
                  id="enabled"
                  v-model="tempCoupon.enabled"
                  class="form-check-input"
                  type="checkbox"
                >
                <label
                  class="form-check-label"
                  for="enabled"
                >是否啟用</label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              關閉
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="updateCoupon()"
            >
              {{ status === 'created' ? '新增優惠卷' : '更新優惠券' }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- DeleteModal -->
    <DeleteModal
      :item="tempCoupon"
      :is-coupon="isCoupon"
      ref="DeleteModal"
      @updateList="getCoupons()"
    />
  </div>
</template>

<script>
/* global $ */

import DeleteModal from '@/components/DeleteModal.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  name: 'Coupons',
  data() {
    return {
      coupons: {},
      tempCoupon: {
        title: '',
        enabled: false,
        percent: 100,
        deadline_at: 0,
        code: '',
      },
      due_date: '',
      due_time: '',
      status: '',
      pagination: {},
      isCoupon: true,
      isLoading: false,
    };
  },
  components: {
    DeleteModal,
    Pagination,
  },
  created() {
    this.getCoupons();
  },
  methods: {
    getCoupons() {
      this.isLoading = true;

      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/coupons`;

      this.axios.get(api).then((res) => {
        this.coupons = res.data.data;
        this.pagination = res.data.meta.pagination;

        this.isLoading = false;
      });
    },
    openCouponModal(status, item) {
      this.status = status;

      switch (status) {
        case 'created':
          this.tempCoupon = {};

          $('#couponModal').modal('show');
          break;
        // 由於 const 與 let 宣告環境較特別，故需要在 case 外層宣告一個 {} 確保作用域
        case 'edit': {
          this.tempCoupon = { ...item };

          // 使用 split 切割相關時間戳
          const dedlineAt = this.tempCoupon.deadline.datetime.split(' ');
          [this.due_date, this.due_time] = dedlineAt; // 日期

          $('#couponModal').modal('show');
          break;
        }
        case 'delete':
          this.tempCoupon = { ...item };
          this.$refs.DeleteModal.getDelData(this.tempCoupon.id);
          break;
        default:
          break;
      }
    },
    updateCoupon() {
      this.isLoading = true;

      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/coupon`;
      let httpMethod = '';
      let statusMsg = '';

      if (this.status === 'created') {
        httpMethod = 'post';
        statusMsg = '新增成功！';
      } else {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/coupon/${this.tempCoupon.id}`;
        httpMethod = 'patch';
        statusMsg = '更新成功！';
      }

      // 針對日期做組合重新寫入到物件中
      // 日期格式 Y-m-d H:i:s，例如：「2020-06-16 09:31:18」
      this.tempCoupon.deadline_at = `${this.due_date} ${this.due_time}`;

      this.axios[httpMethod](api, this.tempCoupon).then(() => {
        $('#delCouponModal').modal('hide');
        this.$bus.$emit('message:push', statusMsg, 'success');

        this.getCoupons();
        $('#couponModal').modal('hide');
        this.isLoading = false;
      }).catch(() => {
        this.$bus.$emit('message:push', '發生錯誤！請連絡相關人員處理', 'danger');
        $('#couponModal').modal('hide');
        this.isLoading = false;
      });
    },
  },
};
</script>
