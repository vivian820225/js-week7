<template>
  <div>
    <div
      v-for="(item, i) in messages"
      :key="i"
      :id="`toast-${i}`"
      class="toast fade show toastPosition"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      data-autohide="false"
    >
      <div class="toast-header">
        <div
          class="inline-block rounded mr-2"
          style="width: 20px; height: 20px"
          :class="`bg-${ item.status }`"
        />
        <strong class="mr-auto">通知</strong>
        <small>現在</small>
        <button
          type="button"
          class="ml-2 mb-1 close"
          data-dismiss="toast"
          aria-label="Close"
          @click="closeToast(`toast-${i}`)"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="toast-body">
        <!-- 訊息 -->
        {{ item.message }}
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */

export default {
  name: 'Toast',
  data() {
    return {
      messages: [],
    };
  },
  created() {
    const vm = this;
    // 名稱 message:push
    // 傳入兩個參數 message, status
    // 並將 status 預設值為 warning
    vm.$bus.$on('message:push', (message, status = 'warning') => {
      vm.updateMessage(message, status);
    });
  },
  methods: {
    updateMessage(message, status) {
      const timestamp = Math.floor(new Date() / 1000);

      this.messages.push({
        message,
        status,
        timestamp,
      });
      this.removeMessageWithTiming(timestamp);
    },
    // 過一定時間後關閉
    removeMessageWithTiming(timestamp) {
      const vm = this;
      setTimeout(() => {
        vm.messages.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            vm.messages.splice(i, 1);
          }
        });
      }, 5000);
    },
    removeMessage(num) {
      this.messages.splice(num, 1);
    },
    // 手動關閉
    closeToast(element) {
      $(`#${element}`).toast('hide');
    },
  },
};
</script>

<style scoped lang="scss">
  .toastPosition {
    min-width: 300px;
    position: fixed;
    right: 16px;
    top: 16px;
    z-index: 1000;
  }
</style>
