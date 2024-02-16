import { NextFunction, Request, Response } from "express";
import { HttpException } from "src/utils/HttpExeption";

export default function (req: Request, res: Response, next: NextFunction) {


    const id = parseInt(req.params.id)
    if (Number.isNaN(id)) {
        const error = new HttpException(400, "id deve ser um número inteiro")
        const { status, message } = error

        res.status(status).json({ message })

    } else {
        next()

    }


}