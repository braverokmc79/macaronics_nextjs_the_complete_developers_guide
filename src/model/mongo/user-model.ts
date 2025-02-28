import { UserType } from "@/types/UserType";
import mongoose, { Schema } from "mongoose";



const userSchema = new Schema<UserType>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dob: { type: Date, required: true },
    accountType: { type: String, enum: ["personal", "company"], required: true },
    companyName: { type: String, required: function () { return this.accountType === "company"; } },
    numberOfEmployees: { type: Number, required: function () { return this.accountType === "company"; } },
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model<UserType>("User", userSchema);


//  Mongoose 모델을 중복 생성하지 않도록 방지하기 위해
// ?? 의미는 왼쪽 값이 null 또는 undefined일 경우 오른쪽 값을 사용하는 연산자입니다.
//export const User = mongoose.models.User ?? mongoose.model("User", userSchema);

//Mongoose에서는 모델 이름을 기준으로 컬렉션 이름을 자동으로 결정합니다. 
// 모델 이름이 "User"일 경우, Mongoose는 이를 복수형으로 변환하여 "users"라는 컬렉션 이름을 사용합니다.
// 이는 Mongoose의 기본 동작입니다.
//이 동작을 바꾸고 싶다면, 모델을 정의할 때 명시적으로 컬렉션 이름을 지정할 수 있습니다:
//export const User = mongoose.models.User ?? mongoose.model("User", userSchema, "custom_users");
