import { mapState } from 'vuex'

/**
 * 监听页面宽度变化
 */
export default {
  computed: {
    ...mapState('page', ['pageWidth'])
  },
  mounted() {
    console.log(this.pageWidth)
  },
  methods: {}
}
