<template>
  <div
    class="modal fade"
    id="productModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="productModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="productModalLabel">
            {{ isNew === true ? "新增商品" : "修改商品"}}
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <!-- 圖片上傳 -->
            <div class="col-sm-4">
              <div class="form-group">
                <label for="imageUrl">輸入圖片網址</label>
                <input
                  type="text"
                  id="imageUrl"
                  class="form-control"
                  placeholder="請輸入圖片連結"
                  v-model="tempProduct.imageUrl[0]"
                />
              </div>
              <div class="form-group">
                <label for="customFile">
                  或 上傳圖片
                  <i v-if="status.fileUploading" class="fas fa-spinner fa-spin"></i>
                </label>
                <input
                  type="file"
                  id="customFile"
                  ref="file"
                  class="form-control"
                  @change="uploadFile"
                />
              </div>
              <!-- 圖片顯示 -->
              <img class="img-fluid" :src="tempProduct.imageUrl[0]" alt />
            </div>
            <div class="col-sm-8">
              <div class="form-group">
                <label for="title">標題</label>
                <input
                  type="text"
                  id="title"
                  class="form-control"
                  placeholder="請輸入標題"
                  v-model="tempProduct.title"
                />
              </div>

              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="category">分類</label>
                  <input
                    type="text"
                    id="category"
                    class="form-control"
                    placeholder="請輸入分類"
                    v-model="tempProduct.category"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="unit">單位</label>
                  <input
                    type="unit"
                    id="unit"
                    class="form-control"
                    placeholder="請輸入單位"
                    v-model="tempProduct.unit"
                  />
                </div>
              </div>

              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="origin_price">原價</label>
                  <input
                    type="text"
                    id="origin_price"
                    class="form-control"
                    placeholder="請輸入原價"
                    v-model="tempProduct.origin_price"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="price">售價</label>
                  <input
                    type="unit"
                    id="price"
                    class="form-control"
                    placeholder="請輸入售價"
                    v-model="tempProduct.price"
                  />
                </div>
              </div>
              <div class="form-group">
                <label for="description">商品說明</label>
                <textarea
                  id="description"
                  class="form-control"
                  v-model="tempProduct.description"
                  placeholder="請輸入商品說明"
                  type="text"
                  required
                ></textarea>
              </div>
              <div class="form-group">
                <label for="content">商品描述</label>
                <textarea
                  id="content"
                  class="form-control"
                  v-model="tempProduct.content"
                  placeholder="請輸入商品描述"
                  type="text"
                  required
                ></textarea>
              </div>
              <hr />
              <div class="form-group">
                <div class="form-check">
                  <input
                    type="checkbox"
                    id="enabled"
                    class="form-check-input"
                    v-model="tempProduct.enabled"
                  />
                  <label for="enabled" class="form-check-label">是否啟用</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary" @click="updateProduct">確認儲存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */

export default {
  name: 'ProductModal',
  data() {
    return {
      tempProduct: {
        imageUrl: [],
        options: {},
      },
      status: {
        fileUploading: false,
      },
    };
  },
  props: ['product', 'isNew'],
  methods: {
    getProductDetail(id, type) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/product/${id}`;

      switch (type) {
        case 'new':
          this.tempProduct = {
            imageUrl: [],
            options: {},
          };
          $('#productModal').modal('show');
          this.isLoading = false;
          break;
        default:
          this.axios.get(api).then((res) => {
            this.tempProduct = res.data.data;
            $('#productModal').modal('show');
            this.isLoading = false;
          });
          break;
      }
    },
    updateProduct() {
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/product`;
      let httpMethod = 'post';

      if (!this.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/product/${this.tempProduct.id}`;
        httpMethod = 'patch';
      }

      this.axios[httpMethod](api, this.tempProduct).then(() => {
        $('#productModal').modal('hide');

        if (httpMethod === 'post') {
          this.$bus.$emit('message:push', '商品新增成功', 'success');
        } else {
          this.$bus.$emit('message:push', '商品更新成功', 'success');
        }

        this.$emit('updateList');
      }).catch(() => {
        $('#productModal').modal('hide');
        this.$bus.$emit('message:push', '商品新增失敗', 'danger');
      });
    },
    /**
     * 上傳圖片
     */
    uploadFile() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/storage`;
      // 選取 DOM 中的檔案資訊
      const uploadedFile = this.$refs.file.files[0];
      // 轉換成 FormData
      const formData = new FormData();
      // 新增 file 欄位
      formData.append('file', uploadedFile);
      this.status.fileUploading = true;

      this.axios.post(api, formData, {
        // 聲明傳遞的資料為 FormData 的格式
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((res) => {
        this.status.fileUploading = false;
        // 200 為 HTTP 狀態碼 Successful responses 請求成功
        if (res.status === 200) {
          // 將圖片路徑傳進去
          this.tempProduct.imageUrl.push(res.data.data.path);
          // console.log(res.data.data.path);
        }
      }).catch(() => {
        this.$bus.$emit('message:push', '上傳不可超過 2MB', 'danger');
        this.status.fileUploading = false;
      });
    },
  },
};
</script>
