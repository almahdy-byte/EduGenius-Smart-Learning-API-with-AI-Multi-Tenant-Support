import { Transform } from "class-transformer";
import { IsEmail,   IsEnum, IsNotEmpty, IsString, IsStrongPassword, MinLength   } from "class-validator";
import { Role } from "src/Common";

export class RegisterDTO{

    @IsNotEmpty()
    @IsString()
    @MinLength(8 , {message :'userName must be at least 8 characters' })
    userName ;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email;

    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    password;


    @IsEnum(Role)
    role?:Role = Role.USER

}

export class LoginDTO{
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email;

    @IsNotEmpty()
    @IsString()
    password;
}

export class VerifyEmailDTO {
    @IsNotEmpty()
    @Transform(({ value }) => `${value}`)
    @IsString()
    OTP: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;
}
