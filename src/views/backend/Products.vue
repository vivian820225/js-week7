<template>
  <div>
    <Loading :active.sync="isLoading"/>
    <div class="container mt-4">
      <div class="d-flex justify-content-between">
          <h1 class="h3">商品管理列表</h1>
          <button
            type="button"
            class="btn btn-primary"
            @click="openModal('new')"
            >
            建立新產品
          </button>
      </div>
      <table class="table mt-3">
          <thead>
            <tr>
              <th>分類</th>
              <th>產品名稱</th>
              <th width="120">原價</th>
              <th width="120">售價</th>
              <th width="120">是否啟用</th>
              <th width="120">編輯</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, idx) in products" :key="idx">
              <td>{{ item.category }}</td>
              <td>{{ item.title }}</td>
              <td>{{ item.origin_price | currency  }}</td>
              <td>{{ item.price | currency  }}</td>
              <td>
                <span v-if="item.enabled" class="text-success">啟用</span>
                <span v-else>未啟用</span>
              </td>
              <td>
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-outline-primary btn-sm"
                    @click="openModal('edit', item)"
                  >
                    編輯
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    @click="openModal('delete', item)"
                  >
                    刪除
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <Pagination :pages="pagination" @updateList="getProducts()"/>
    </div>
    <!-- ProductModal -->
    <ProductModal
      :product="tempProduct"
      :is-new="isNew"
      ref="ProductModal"
      @updateList="getProducts()"
    />
    <!-- DeleteModal -->
    <DeleteModal
      :item="tempProduct"
      :is-product="isProduct"
      ref="DeleteModal"
      @updateList="getProducts()"
    />
  </div>
</template>

<script>
import ProductModal from '@/components/ProductModal.vue';
import DeleteModal from '@/components/DeleteModal.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  name: 'Products',
  data() {
    return {
      products: [],
      tempProduct: {
        imageUrl: [],
        options: {},
      },
      isProduct: true,
      isNew: false,
      pagination: {},
      isLoading: false,
    };
  },
  components: {
    ProductModal,
    DeleteModal,
    Pagination,
  },
  created() {
    this.getProducts();
  },
  methods: {
    getProducts(page = 1) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/products?page=${page}`;

      this.axios.get(api).then((res) => {
        // console.log(res);
        this.products = res.data.data; // 取得商品列表
        this.pagination = res.data.meta.pagination; // 取得分頁資訊

        this.isLoading = false;
      }).catch(() => {
        this.isLoading = false;
      });
    },
    openModal(type, item) {
      switch (type) {
        case 'new':
          // isNew 狀態切換為 true 表示新增商品
          this.isNew = true;

          this.tempProduct = {
            imageUrl: [],
            options: {},
          };

          this.$refs.ProductModal.getProductDetail(this.tempProduct.id, type);
          break;
        case 'edit':
          this.tempProduct = { ...item };
          this.isNew = false;
          this.$refs.ProductModal.getProductDetail(this.tempProduct.id, type);
          break;
        case 'delete':
          this.tempProduct = { ...item };
          this.$refs.DeleteModal.getDelData(this.tempProduct.id);
          break;
        default:
          this.tempProduct = item;
          this.showProductModal = true;
          break;
      }
    },
  },
};
</script>
