<template>
<VueBotUI
  :botTitle="botTitle"
  :messages="data"
  :options="botOptions"
  @msg-send="messageSendHandler"
/>
</template>

<script>
  import { VueBotUI } from 'vue-bot-ui'

  export default {
     components: { VueBotUI},

     data () {
      return {
        botTitle:"模型對話式訓練",
        data: [
  {
    agent: 'bot',
    type: 'text',
    text: '你好，我能為你做什麽？',
    disableInput: false,
  },
  {
    agent: 'user',
    type: 'text', // always
    text: '我想查公司地址',
  },
],
   botOptions: {
  agent: 'bot',
  type: 'button',
  text: '請選擇下面的選項',
  disableInput: true,
  options: [
    {
      text: '打開谷歌',
      value: 'https://google.com',
      action: 'url'
    },
    {
      text: '提交内容',
      value: 'submit_ticket',
      action: 'postback'
    }
  ]
}
      }
    }
  }
</script>
