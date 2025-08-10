import { BadRequestException, CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { TokenService } from "../Services";
import { UserRepo } from "src/DB/Models/User";


@Injectable()
export class AuthGuard implements CanActivate{

    constructor(
        private readonly tokenService:TokenService,
        private readonly userRepo : UserRepo
    ){}


    async canActivate (context: ExecutionContext): Promise<boolean>  {
        const request = context.switchToHttp().getRequest();

        const { authorization } = request.headers;

        if(!authorization){
            throw new BadRequestException('Authorization header is missing');
        }

        const decode  = await this.tokenService.decodeToken(authorization, {});

        if(!decode){
            throw new BadRequestException('Invalid token');
        }

        const user = await this.userRepo.findById(decode['id']);

        console.log({user , decode});
        
        if(!user){
            throw new BadRequestException('User not found');
        }

        request.user = user;



        return true;
    }
}