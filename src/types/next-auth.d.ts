import { UserInerface } from "./AuthInterfaces";

declare module "next-auth" {
  interface Session {
    user: UserInerface;
    token: string;
  }

  interface User {
    userRes: UserInerface;
    tokenRes: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userRes?: UserInerface;
    tokenRes?: string;
  }
}
