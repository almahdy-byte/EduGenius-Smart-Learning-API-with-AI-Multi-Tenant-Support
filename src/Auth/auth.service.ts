import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { compare, hash, otp, SendEmailEvent, TokenService } from 'src/Common';
import { UserRepo } from 'src/DB/Models/User/user.repo';
import { LoginDTO, RegisterDTO, VerifyEmailDTO } from './DTO';
import { TUser } from 'src/DB/Models/User';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepo:UserRepo,
        private readonly tokenService : TokenService

     ){}


    async register(registerDTO : RegisterDTO):Promise<TUser>{
        const {email} = registerDTO;

        const isUserExist = await this.userRepo.findByEmail(email);

        if(isUserExist){
            throw new ConflictException('Email already exist')
        }

        const OTP = otp();
         
        SendEmailEvent.emit('verify-email',{to : email , OTP  , username : registerDTO.userName})

        const user = await this.userRepo.create({
            ...registerDTO ,
            password : hash(registerDTO.password),
            OTP : hash(OTP)
        });

        return user;
    }

    async login(loginDTO : LoginDTO){

        const {email , password} = loginDTO;

        const user = await this.userRepo.findByEmail(email);
        if(!user){
            throw new NotFoundException('Email not found')
        }

        const isPasswordValid = compare(password , user.password);
        if(!isPasswordValid){
            throw new ConflictException('Password not valid')
        }

        const token =await this.tokenService.generateToken(
            {id : user._id} , 
            {expiresIn : '1w'} , 
            user.role
        )
        

        return {token}
        
    }

    async verifyEmail (verifyEmailDTO : VerifyEmailDTO):Promise<object>{

        const {email , OTP} = verifyEmailDTO;

        const user = await this.userRepo.findByEmail(email);
        if(!user){
            throw new NotFoundException('Email not found')
        }

        const isCorrectOTP = compare(OTP , user.OTP);
        if(!isCorrectOTP){
            throw new ConflictException('OTP not valid')
        }

        await user.updateOne({
            isVerified : true,
            $unset:{
                OTP : 1
            }
        })
        return {
            message : 'Email verified successfully'
        }

    }

    profile = (user:TUser):TUser=> user;
}
