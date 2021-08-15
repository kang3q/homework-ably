# homework-ably

## 데모 페이지
링크: [https://kang3q.github.io/homework-ably/](https://kang3q.github.io/homework-ably/)
```text
ID: ably368@dummy.com
PW: !abc321#$
인증코드: 171009
```

## 실행 방법
```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# generate static project
$ npm run generate
```

## 사용 기술
```text
Language: Typescript
Framework: Nuxt.js
UI Library: Vuetify
http request: Axios
```

## 구현 범위
```text
A + B + C 스펙 모두 구현
```

## 소개하고 싶은 부분
- composition-api를 사용한 컴포넌트 구성
- vuex-module-decorators를 사용한 store 구성
- Axios interceptors로 error 처리 공통화.
- 비밀번호 재설정 페이지에 router lifecycle 적용으로 초기화 작업
- esLint, prettier, lint-staged를 사용한 컨벤션 정하기.(크게 정하진 않았지만, 컨벤션은 자동화로!)
- API 스펙별로 Type을 정의하였다. 평소 해보고 싶은 생각에 해봤는데 보기에는 괜찮은 것 같다.
  - src/types/api.ts
  - 다행히 API가 restful 하게 정의가 되어있었다.

## 아쉬운 점
- 테스트 코드를 작성하려고 했으나 실행이 안 되어 못했다. 실무에서 테스트 코드를 작성하지 않아 구성 방법을 찾는데 어려움이 많았다. 언젠가는 이런 날이 올 줄 알았다.
- vuetify를 사용했더니 날로 먹은 느낌이다. ui 라이브러리를 자주 사용하진 않지만 써보니 너무 편하네. 좀 익숙해지면 이런 것만 찾아 사용할까 무섭다.
- 빌드 결과물 크기를 체크하지 않았다. 트리쉐이킹이 필요할 것으로 추측된다. vuetify 덩치에 비해 사용한 것은 별로 없다.
- nuxt를 사용했지만 ssr 모드로 사용하진 않았다. 역시나 ssr 모드로 돌려보니 틀어진다. 이유는 github pages를 사용하다 보니 root 경로가 생겨 추가 설정을 하였는데, 이 부분에서 경로가 틀어지는 것 같다. 하지만 운영 환경별 설정으로 해결 가능할 것이며, ssr로의 전환이 충분히 가능한 것으로 운영시 필요에 따라 전환 가능성을 쉽게 열 수 있다.
- vue3.2 버전을 사용해볼걸 그랬나 싶다. vue3.2가 스벨트보다 빠르다고 하던데. 궁금하네.
