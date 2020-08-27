<template>
  <nav aria-label="Page navigation" class="mt-4">
    <ul class="pagination justify-content-end">
      <li class="page-item" :class="{'disabled': pages.current_page === 1}">
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="emitPages(pages.current_page - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        class="page-item"
        v-for="(page, idx) in pages.total_pages"
        :key="idx"
        :class="{'active': page === pages.current_page}"
      >
        <a class="page-link" href="#" @click.prevent="emitPages(item)">{{ page }}</a>
      </li>
      <li class="page-item" :class="{'disabled': pages.current_page === pages.total_pages}">
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click.prevent="emitPages(pages.current_page + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Pagination',
  data() {
    return {};
  },
  props: {
    pages: {},
  },
  methods: {
    emitPages(item) {
      this.$emit('updateList', item);
    },
  },
};
</script>
