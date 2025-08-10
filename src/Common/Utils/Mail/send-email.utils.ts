import {EventEmitter} from 'events'
import * as nodemailer from 'nodemailer'
import { html } from './template'


export const sendEmail=(sendEmailOptions : nodemailer.SendMailOptions)=>{

    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        service: "gmail",
        port: 465,
        secure: true,

        auth:{
            user:process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })

    transporter.sendMail(sendEmailOptions)
}

export const SendEmailEvent = new EventEmitter();


SendEmailEvent.on('verify-email',({to , OTP , username})=>{
    sendEmail({
        from : process.env.EMAIL ,
        subject : 'verify email',
        html : html(OTP , username) ,
        to
    })
})



