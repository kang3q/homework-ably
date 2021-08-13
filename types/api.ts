namespace ResponseType {
  export interface Error {
    error: {
      message: string
    }
  }
  export namespace ResetPassword {
    export interface Get {
      issueToken: string // 인증 코드 발급 요청 토큰
      remainMillisecond: number // 인증 코드 확인 남은 시간
    }
    export interface Post {
      confirmToken: string // 인증 코드 검증 토큰
    }
  }
}

namespace RequestType {
  export namespace ResetPassword {
    export interface Post {
      email: string // 이메일
      authCode: string // 비밀번호 재설정 인증 코드
      issueToken: string // 인증 코드 발급 요청 토큰
    }
    export interface Patch {
      email: string // 이메일
      confirmToken: string // 인증 코드 검증 토큰
      newPassword: string // 새로운 비밀번호
      newPasswordConfirm: string // 새로운 비밀번호 확인
    }
  }
}
