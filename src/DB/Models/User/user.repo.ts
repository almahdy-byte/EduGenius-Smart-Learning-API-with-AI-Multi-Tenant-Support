import { DBService } from "src/DB/db.service";
import { TUser } from "./user.model";
import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./user.schema";


@Injectable()
export class UserRepo extends DBService<TUser>{

    constructor(@InjectModel(User.name) private readonly userModel:Model<TUser>){
        super(userModel)
    }

    findByEmail(email:string):Promise<TUser | null>{

        return this.userModel.findOne({email})
    }

}