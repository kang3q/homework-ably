<script>
export default {
  name: 'index',
  beforeRouteEnter(to, from, next) {
    next('/changePassword/step1')
  },
}
</script>
