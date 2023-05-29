<script>
import { Radar } from 'vue-chartjs'

export default {
  extends: Radar,
  props: {
    data: {
      type: Object,
      required: true
    },
    options: {
      type: Object,
      default: () => ({})
    },
  },
  mounted () {
    this.renderChart(this.data, this.options)
  }
}
</script>

