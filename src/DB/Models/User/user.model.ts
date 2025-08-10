import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./user.schema";
import { Document } from "mongoose";

export const UserModel = MongooseModule.forFeature([{
    name : User.name , 
    schema : UserSchema
}])

export type TUser = User & Document ; 