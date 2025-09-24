<template>
  <div class="search">
    <input
      id="query"
      class="input"
      type="search"
      v-model="searchContent"
      @keydown.enter="emitSearch"
      placeholder="请输入关键词..."
      name="searchbar"
    />
    <svg @click="emitSearch" viewBox="0 0 24 24" aria-hidden="true" class="search-icon">
      <g>
        <path
          d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"
        ></path>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'HistorySearchButton',
  data () {
    return {
      searchContent: ''
    }
  },
  methods: {
    // 将搜索内容传递给父组件(为空也传递)
    emitSearch () {
      this.$emit('search', this.searchContent.trim())
      this.searchContent = this.searchContent.trim()
    }
  },
  watch: {
    // 监听输入框的内容变化
    searchContent (newVal) {
      if (newVal === '') {
        this.emitSearch() // 输入框为空时，自动触发搜索
      }
    }
  }
}
</script>

<style scoped>
.search {
  display: flex;
  line-height: 28px;
  align-items: center;
  position: relative;
  max-width: 400px;
}

.input {
  width: 100%;
  height: 45px;
  padding-left: 50px;
  padding-right: 16px;
  /* 模拟输入框的边框 */
  box-shadow: 0 0 0 2px #76afff, 0 0 25px -17px #5199ff;
  border: 0;
  outline: none;
  border-radius: 12px;
  font-size: 17px;
  /* 搜索框背景色 */
  background-color: #16171d;
  background-color: #eeeeee61;
  outline: none;
  /* 文字颜色 */
  color: #000;
  transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
  cursor: text;
  z-index: 1;
}

.input::placeholder {
  /* 提示文字颜色 */
  color: #838383;
}

.input:hover {
  box-shadow: 0 0 0 3px #4592ff, 0px 0px 25px -15px #5199ff;
}

.input:active {
  transform: scale(0.97);
}
.input:active + .search-icon{
  transform: scale(0.85);
}
.input:focus {
  box-shadow: 0 0 0 3.3px #4592ff;
}

/* svg图片样式 */
.search-icon {
  position: absolute;
  left: 12px;
  fill: #0d72ff;
  width: 27px;
  height: 27px;
  /* pointer-events: none; */
  z-index: 1;
  transition: all 0.3s;
}
.search-icon:active {
  transform: scale(0.65);
}

</style>
