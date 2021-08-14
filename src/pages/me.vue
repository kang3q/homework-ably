<template>
  <v-container>
    <v-row>
      <nuxt-link to="/" style="text-decoration: none">
        <v-btn>홈으로</v-btn>
      </nuxt-link>
      <v-btn class="ml-2">로그아웃</v-btn>
    </v-row>
    <v-row justify="space-around" class="pt-3">
      <v-card width="400">
        <v-img height="200px" :src="profileImage">
          <v-card-title class="white--text mt-16">
            <v-avatar size="56">
              <img alt="user" :src="profileImage" />
            </v-avatar>
            <p class="ml-3">{{ name }}</p>
          </v-card-title>
        </v-img>
        <v-card-text>
          <div class="font-weight-bold ml-8 mb-2">{{ email }}</div>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, toRefs } from '@nuxtjs/composition-api'
import { Context } from '@nuxt/types'
import { userStore } from '~/store'

export default defineComponent({
  name: 'Me',
  setup(props) {
    return {
      ...toRefs<ResponseType.User.Get>(props as ResponseType.User.Get),
    }
  },
  asyncData(ctx: Context): Promise<object | void> | object | void {
    return userStore
      .fetchUser() //
      .catch((e) => {
        ctx.redirect('/login')
        console.error(e)
      })
  },
})
</script>
