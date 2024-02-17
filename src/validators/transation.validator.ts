import { Transaction } from "src/interfaces/transaction.interface"
import { HttpException } from "src/utils/HttpExeption"

export default function (body: Transaction) {
   
    if (!body.valor || !body.descricao || !body.tipo) {

        throw new HttpException(400, `o corpo da requisição deve conter: valor, descrição e tipo`)
    }

    if((typeof body.valor)!="number" ){
        throw new HttpException(400, `valor deve ser um numero inteiro`)
        
    }
    if (body.tipo != "c" && body.tipo != "d") {
        throw new HttpException(400, `tipo de transação inválido, use 'c' para crédito ou 'd' para débito`)
    }

    if (body.descricao.length > 10 || body.descricao.length < 1) {
        throw new HttpException(400, `a descrição deve ter no máximo 10 caracteres e no minimo 1.`)
    }

    body.valor=Math.floor(body.valor)
    return body
}