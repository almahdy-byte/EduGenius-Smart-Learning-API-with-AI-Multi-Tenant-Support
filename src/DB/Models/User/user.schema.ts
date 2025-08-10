import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Role } from "src/Common";

@Schema()
export class User {

    @Prop(
        {
            type : String,
            required : true
        }
    )
    userName : string

    @Prop(
        {
            type : String,
            required : true
        }
    )
    password : string   

    @Prop(
        {
            type : String,
            required : true
        }
    )
    email : string

    @Prop(
        {
            enum:Role ,
            default:Role.USER
        }
    )
    role : string

    @Prop({
        type : Boolean,
        default : false
    })
    isVerified : boolean

    @Prop({
        type : String,
    })
    OTP : string


}


export const UserSchema = SchemaFactory.createForClass(User);
