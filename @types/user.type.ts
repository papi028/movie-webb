import { User } from "firebase/auth";

export interface IUser {
  id: string;
  avatar: string;
  email: string;
  role: string;
  follows: string[];
  status: string;
  createdAt: {
    nanoseconds: number;
    seconds: number;
  };
  fullname: string;
}

export interface ICurrentUser extends User {
  avatar?: string;
  password?: string;
  role?: string;
  status?: string;
  createdAt?: {
    nanoseconds: number;
    seconds: number;
  };
  fullname?: string;
}
