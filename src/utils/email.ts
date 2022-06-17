import nodemailer from 'nodemailer';
import config from 'config';
import { Prisma } from '@prisma/client';
import pug from 'pug';
import { convert } from 'html-to-text';

const smtp = config.get<{
    host: string,
    port: number,
    user: string,
    pass: string
}>('smtp');

export default class Email  {
   #firstName: string;
   #to: string;
   #from: string;

   constructor(private user: Prisma.UserCreateInput, private url: string){
       this.#firstName = user.name.split(' ')[0];
       this.#to = user.email;
       this.#from = `Waridi<wabuyajames@gmail.com>`
   }

   private newTransport(){
       return nodemailer.createTransport({
           ...smtp,
           auth: {
               user: smtp.user,
               pass: smtp.pass
           },
       });
   }

   private async send(template: string, subject: string){
     const html = pug.renderFile(`${__dirname}/../views/${template}.pug`, {
         firstName: this.#firstName,
         subject,
         url: this.url,
     });

     //Create MailOptions
     const mailOptions = {
         from: this.#from,
         to: this.#to,
         subject,
         text: convert(html),
         html,
     };

     //Send Mail
     const info = await this.newTransport().sendMail(mailOptions);
     console.log(nodemailer.getTestMessageUrl(info));
   }

   async sendVerificationCode(){
       await this.send('verificationCode', 'Your account verification code');
   }



}