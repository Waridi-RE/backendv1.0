import nodemailer from 'nodemailer';
const SENDER_MAIL = `${process.env.SENDER_EMAIL_ADDRESS}`;
const PASS = `${process.env.PASS}`;

//Send Mail
const sendMail = async (to: string, url: string, txt: string) => {
 try {
    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: SENDER_MAIL,
            pass: PASS,
        },
    });
    const mailOptions = {
        from: 'wabuyajames@gmail.com',
        to: to,
        subject: "Activation Email",
        html: `
           <div style="max-width: 700px; margin: auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
             <h2 style="text-align: center; text-transform: uppercase; color: teal">Welcome To Waridi Inc. </h2>
             <p> Congratulations! You're almost set to start using Waridi Inc.
                   Confirm Registration.
             </p>
             <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
             <p>Use The Link Below if The Button Doesn't work;</p>
             <div>${url}</div>
           </div>
        `,
    };    
    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (err) {
       console.error(err); 
    }
};

export default sendMail;