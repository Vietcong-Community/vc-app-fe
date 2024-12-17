// jaké údaje API očekává při registraci
export interface IRegisterUser {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}
// jaký typ dat API vrací při úspěšné registraci
export interface IRegisteredUser {
  id: number;
  username: string;
  email: string;
}
