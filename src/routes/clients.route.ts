import express, { Request, Response } from "express";
import { Transaction } from "src/interfaces/transaction.interface";
import clientModel from "src/models/client.model";

import { HttpException } from "src/utils/HttpExeption";

const router = express.Router()


router.post('/clientes/:id/transacoes', async (req: Request, res: Response) => {
    try {
        console.log(req.params.id)

        if (req.params.id.match(/^[0-9]+$/) == null) {

            throw new HttpException(400, "id deve ser um número inteiro")
        }

        const body: Transaction = req.body

        if (!body.valor || !body.descricao || !body.tipo) {

            throw new HttpException(400, `o corpo da requisição deve conter: valor, descrição e tipo`)
        }

        if (body.tipo != "c" && body.tipo != "d") {
            throw new HttpException(400, `tipo de transação inválido, use 'c' para crédito ou 'd' para débito`)
        }


        const client = await clientModel.model.findOne({id:req.params.id})

        res.json(client)
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