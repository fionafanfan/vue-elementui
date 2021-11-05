<template>
<VueBotUI
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
        data: [
  {
    agent: 'bot',
    type: 'text',
    text: 'Hello. How can I help you',
    disableInput: false,
  },
  {
    agent: 'user',
    type: 'text', // always
    text: 'I need a new laptop',
  },
],
        botOptions: {
  agent: 'bot',
  type: 'button',
  text: 'Select the option below',
  disableInput: true,
  options: [
    {
      text: 'Open Google',
      value: 'https://google.com',
      action: 'url'
    },
    {
      text: 'Submit Support Ticket',
      value: 'submit_ticket',
      action: 'postback'
    }
  ]
}
      }
    }
  }
</script>
