<template>
  <div>
    <metric
      uuid="628f5475-d7d7-4c47-be01-a80e17359aa0"
      type="promiseMetric"
      :socket="socket" >
    </metric>
    <agent
      v-for="agent in agents"
      :uuid="agent.uuid"
      :key="agent.uuid">
    </agent>
    <p v-if="error">{{error}}</p>
  </div>
</template>

<style>
  body {
    font-family: Arial;
    background: #f8f8f8;
    margin: 0;
  }
</style>

<script>
const io = require('socket.io-client')
const socket = io.connect()

module.exports = {
  data () {
    return {
      agents: [],
      error: null,
      socket
    }
  },

  mounted () {
    this.initialize()
  },

  methods: {
    initialize () {
    }
  }
}
</script>