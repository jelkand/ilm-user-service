export interface IAuthToken {
  jti: string
  user: {
    id: string
    isAdmin: boolean
  }
  iat: number
  exp: number
}