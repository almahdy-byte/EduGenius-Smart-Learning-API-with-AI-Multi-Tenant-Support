import { Body, Controller, Get, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO, VerifyEmailDTO } from './DTO';
import { AuthGuard } from '../Common';

@Controller('')
export class AuthController {
    constructor(private readonly authServices:AuthService){
    }

    @Post('register')
    async register(@Body() registerDTO:RegisterDTO){
        return this.authServices.register(registerDTO)
    }

    @Post('login')
    async login(@Body() loginDTO : LoginDTO){
        return this.authServices.login(loginDTO)

    }

    @Patch('verify-email')
    async verifyEmail(@Body() verifyEmailDTO : VerifyEmailDTO){
        return this.authServices.verifyEmail(verifyEmailDTO)
    }

    @Get('profile')
    @UseGuards(AuthGuard)
    profile(@Request() req : Request){
        const user = req['user'];
        return this.authServices.profile(user);

    }
}
