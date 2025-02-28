import { User } from "next-auth";

export interface UserType  extends User{
    id?: string
    name?: string | null
    email: string 
    image?: string | null
    accountType: "personal" | "company";
    dob: Date;
    password: string;
    passwordConfirm: string;
    companyName?: string | undefined;
    numberOfEmployees?: number | undefined;
    createdAt: Date;
    updatedAt: Date;
}
  