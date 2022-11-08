import { Request, Response } from "express";

class ApplicationController {
    public doSomething(req: Request, res: Response) {
        return res.status(200).json({
            success: 'Access Granted'
        })
    }
}

export default new ApplicationController;
