import nodemailer from 'nodemailer';
import config from 'config';

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
}