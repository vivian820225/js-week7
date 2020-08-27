<template>
  <div>
    <Loading :active.sync="isLoading" />
    <div class="container mt-4">
      <div class="d-flex justify-content-between">
        <h1 class="h3">圖片儲存列表</h1>
      </div>
      <table class="table mt-3">
        <thead>
          <tr>
            <th>圖片縮圖</th>
            <th>ID</th>
            <th class="text-right">操作</th>
          </tr>
        </thead>
        <tbody v-if="storage.length">
          <tr v-for="(item, i) in storage" :key="i">
            <td>
              <img
                :src="item.path"
                class="img-fluid fixWidth"
              >
            </td>
            <td>
            <p class="ellipsis imgTitle"> {{ item.id }} </p>
            </td>
            <td class="text-right">
              <div class="btn-group btn-group-sm">
                <button
                  class="btn btn-outline-danger"
                  @click="openDelModal(item)"
                >
                  刪除
                </button>
            </div>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination :pages="pagination" @updateList="getData()"/>
    </div>

    <DeleteModal
      :item="tempData"
      ref="DeleteModal"
      @updateList="getData()"/>
  </div>
</template>

<script>
import DeleteModal from '@/components/DeleteModal.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  name: 'Storage',
  data() {
    return {
      storage: {},
      tempData: {},
      pagination: {},
      isLoading: false,
    };
  },
  components: {
    DeleteModal,
    Pagination,
  },
  created() {
    this.getData();
  },
  methods: {
    getData(page = 1) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/storage?page=${page}`;

      this.axios.get(api).then((res) => {
        this.storage = res.data.data;
        this.pagination = res.data.meta.pagination;

        this.isLoading = false;
      });
    },
    openDelModal(item) {
      this.tempData = { ...item };
      this.$refs.DeleteModal.getDelData(this.tempData.id);
    },
  },
};
</script>

<style lang="scss">
  .fixWidth {
    width: 100px;
  }

  .imgTitle {
    max-width: 280px;
  }
</style>
