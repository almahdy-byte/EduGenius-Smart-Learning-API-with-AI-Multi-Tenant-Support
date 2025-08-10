import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService, JwtSignOptions, JwtVerifyOptions } from "@nestjs/jwt";
import { Role } from "../Enums";

@Injectable()
export class TokenService{
    constructor(private readonly jwtService : JwtService){}


    sign(payload: object, options: JwtSignOptions): Promise<string | null> {
        return this.jwtService.signAsync(payload, options);
    }

    verify(token: string, options: JwtVerifyOptions): Promise<object | null> {
        return this.jwtService.verifyAsync(token, options);
    }


    generateToken(payload : object , options:JwtSignOptions , role:string = Role.USER):Promise<string | null>{

        if(!Role[`${role.toUpperCase()}`]){
            throw new BadRequestException('Role not found')
        }
        const signature = process.env[`${role.toUpperCase()}_ACCESS_TOKEN_SECRET`];

        const token =  this.sign(payload , {...options, secret: signature });

        return token
    }

    decodeToken(authorization : string , options : JwtVerifyOptions ):Promise<object | null>{

        const parts = authorization.split(" ");

        if(parts.length!==2){
            throw new Error('Invalid authorization')
        }

        const [key , token] = parts

        if(!Role[`${key.toUpperCase()}`]){
            throw new Error('Role not found')
        }

        const signature = process.env[`${key.toUpperCase()}_ACCESS_TOKEN_SECRET`]

        const decode = this.verify(token , {...options , secret : signature})

        return decode

    }
}