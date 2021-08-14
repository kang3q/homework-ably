<script>
export default {
  name: 'ChangePassword',
  beforeRouteEnter(to, from, next) {
    next('/changePassword/step1')
  },
}
</script>
