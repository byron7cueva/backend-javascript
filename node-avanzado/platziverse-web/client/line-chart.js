'use strict'

const { Line, mixins } = require('vue-chartjs')
const { reactiveProp } = mixins

module.exports = {
  extends: Line,
  mixins: [ reactiveProp ],
  props: [ 'options' ],
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}