<template>
  <div id="index">
    <h1>AI控制台文檔</h1>
    AI控制台，主要用於AI意圖和實體模型的訓練，上傳訓練數據，測試訓練結果等等
  </div>
</template>
<script type="text/javascript">
  export default {
    mounted() {
      this.open();
    },
    methods: {
       open() {
        const h = this.$createElement;

        this.$notify({
          title: 'AI控制台-文檔',
          message: h('i', { style: 'color: teal'}, '欢迎进入-AI控制台-文檔'),
          offset: 200
        });
      }
    }
  }
</script>
