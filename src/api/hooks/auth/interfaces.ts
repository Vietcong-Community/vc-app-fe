export interface ICreateUser {
  email: string;
  password: string;
  nickname: string;
}

export interface IForgottenPassword {
  email: string;
}

export interface IChangePassword {
  token: string;
  password: string;
}
