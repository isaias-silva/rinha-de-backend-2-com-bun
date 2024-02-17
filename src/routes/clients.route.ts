import express, { Request, Response } from "express";
import { Transaction } from "src/interfaces/transaction.interface";
import clientModel from "src/models/client.model";

import { HttpException } from "src/utils/HttpExeption";
import logger from "src/utils/logger";
import transationValidator from "src/validators/transation.validator";

const router = express.Router()


router.post('/clientes/:id/transacoes', async (req: Request, res: Response) => {
    try {

        if (req.params.id.match(/^[0-9]+$/) == null) {

            throw new HttpException(400, "id deve ser um número inteiro")
        }
        const client = await clientModel.model.findOne({ id: req.params.id })

        if (!client) {
            throw new HttpException(404, "cliente não encontrado")
        }


        const bodyReq: Transaction = req.body

        const transaction = transationValidator(bodyReq)


        const { tipo, descricao, valor } = transaction

        switch (tipo) {
            case 'c':
               
                   
                break
            case 'd':

                break
        }

        const { limite, saldo_inicial } = client

        res.json({ limite, saldo_inicial })
    } catch (err: any) {
        res.status(err.status || 500).json({ message: err.message || 'internal error' })
    }

})
router.get('/clientes/:id/extrato', (req: Request, res: Response) => {
    try {
        if (req.params.id.match(/^[0-9]+$/) == null) {

            throw new HttpException(400, "id deve ser um número inteiro")
        }

        res.send("ok")

    } catch (err: any) {
        res.status(err.status || 500).json({ message: err.message || 'internal error' })
    }

})


export default router