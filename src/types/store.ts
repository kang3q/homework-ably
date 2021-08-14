export interface IUser {
  resetPassword: null | {
    email: string
    issueToken: string
    confirmToken?: string
    remainMillisecond: number
  }
  accessToken: string | null
}
