import express, { Request, Response } from "express";
import { Transaction } from "src/interfaces/transaction.interface";
import idIsIntMiddleware from "src/middleware/idIsInt.middleware";

import { HttpException } from "src/utils/HttpExeption";

const router = express.Router()

router.use(idIsIntMiddleware)
router.post('/clientes/:id/transacoes', (req: Request, res: Response) => {
    try {

        if (req.body satisfies Transaction) {

            const body: Transaction = req.body

            res.send('ok')
        } else {
            throw new HttpException(400, "objeto de transação inválido")
        }

    } catch (err: any) {
        res.status(err.status || 500).json({ message: err.message || 'internal error' })
    }

})
router.get('/clientes/:id/extrato', (req: Request, res: Response) => {
    try {
        res.send("ok")

    } catch (err: any) {
        res.status(err.status || 500).json({ message: err.message || 'internal error' })
    }

})


export default router