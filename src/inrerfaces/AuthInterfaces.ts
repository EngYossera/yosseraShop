export interface successLogin {
  message: string
  user: UserInerface
  token: string
}
export interface FailedLogin {
  message: string
 statusMsg: string
}


export interface UserInerface {
  name: string
  email: string
  role: string
}
