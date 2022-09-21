import { NextFunction, Request, Response } from "express";
const validRegister = (req: Request, res: Response, next: NextFunction) =>{
   const {name, email, password} = req.body;
   
   if (!name) {
    return res.status(400).json({ message: "Please add your user name" });
  } else if (name.length > 20) {
    return res.status(400).json({ message: "Your surname is up to 20 chars long" });
  }

  if (!email) {
    return res.status(400).json({ message: "Please add your email address" });
  } else if (!validateEmail(email)) {
    return res.status(400).json({ message: "Your email is not valid" });
  }

  if (password.length < 8) {
    return res.json({ message: "Password must be at least 8 chars." });
  }

  next();
}

export function validateEmail(email: string) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
export default validRegister;    
