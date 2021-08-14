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

  export namespace Login {
    export interface Post {
      accessToken: string // JWT 인증 토큰
    }
  }

  export namespace Logout {
    export interface Post {
      lastConnectedAt: Date // 마지막 접속 일자
    }
  }

  export namespace User {
    export interface Get {
      name: string // 이름
      email: string // 이메일
      profileImage: string // 프로필 사진 URL
      lastConnectedAt: Date // 마지막 접속 일자
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

  export namespace Login {
    export interface Post {
      email: string // 이메일
      password: string // 비밀번호
    }
  }
}
