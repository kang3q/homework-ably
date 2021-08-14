<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-4 d-flex justify-center">
        <NuxtLogo />
        <VuetifyLogo />
      </v-card>
      <v-card class="mt-3">
        <v-card-title class="headline">
          Nuxt.js + Vuetify template
        </v-card-title>
        <v-card-text>
          <ul>
            <li class="mb-3">
              <v-btn color="primary" nuxt to="/changePassword">
                [A] 비밀번호 재설정 페이지
              </v-btn>
            </li>
            <li class="mb-3">
              <v-btn color="primary" nuxt to="/login">
                [B] 로그인 페이지
              </v-btn>
            </li>
            <li class="mb-3">
              <v-btn color="primary" nuxt to="/me">
                [C] 회원 정보 조회 페이지
              </v-btn>
            </li>
          </ul>

          <hr class="my-3" />

          <a
            href="https://github.com/kang3q/homework-ably"
            target="_blank"
            rel="noopener noreferrer"
          >
            Go GitHub
          </a>
          <div class="text-xs-right">
            <em><small>&mdash; 강상규</small></em>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <template v-if="isLoggedIn">
            <v-btn color="primary" nuxt to="/me">프로필 보기</v-btn>
            <v-btn color="primary" @click="doLogout">로그아웃</v-btn>
          </template>
          <v-btn v-else color="primary" nuxt to="/login">로그인</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import { userStore } from '~/store'
import useUser from '~/composables/useUser'

export default defineComponent({
  name: 'Index',
  setup() {
    const isLoggedIn = computed(() => !!userStore.accessToken)
    const { doLogout } = useUser()
    return {
      isLoggedIn,
      doLogout,
    }
  },
})
</script>
