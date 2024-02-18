import express, { Request, Response } from "express";
import { Transaction } from "src/interfaces/transaction.interface";
import clientModel from "src/models/client.model";
import transactionsModel from "src/models/transactions.model";

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

                if (client.saldo) {
                    client.saldo -= valor
                }
                break
            case 'd':
                if (client.saldo) {
                    client.saldo -= valor

                    if (client.saldo <= 0 && client.limite) {

                        if ((client.saldo * -1) > client.limite) {

                            throw new HttpException(422, "valor da transação de débito excede seu limite disponível!")
                        }

                    }
                }

                break
        }

        client.save()
        transactionsModel.model.create({ valor, tipo, descricao, realizada_em: new Date(), client: client.id })

        const { limite, saldo } = client

        res.json({ limite, saldo })

    } catch (err: any) {
        res.status(err.status || 500).json({ message: err.message || 'internal error' })
    }

})
router.get('/clientes/:id/extrato', async (req: Request, res: Response) => {
    try {
        if (req.params.id.match(/^[0-9]+$/) == null) {

            throw new HttpException(400, "id deve ser um número inteiro")
        }
        const client = await clientModel.model.findOne({ id: req.params.id })

        if (!client) {
            throw new HttpException(404, "cliente não encontrado")
        }
        console.log(client.id)
        const ultimas_transacoes = await transactionsModel.model.aggregate([{ $match: { client: client.id } }, {
            $group: {
                _id: "$realizada_em",
                valor: { $first: "$valor" },
                tipo: { $first: "$tipo" },
                descricao: { $first: "$descricao" },
                realizada_em: { $first: "$realizada_em" }
            }
        }]).exec()


        const data_de_extrato = new Date()

        const { saldo, limite } = client
        res.status(200).json({
            saldo: {
                total: saldo,
                data_de_extrato,
                limite

            }, ultimas_transacoes
        })

    } catch (err: any) {
        res.status(err.status || 500).json({ message: err.message || 'internal error' })
    }

})


export default router


