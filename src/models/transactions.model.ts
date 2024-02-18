import db from "src/db";

const transactionSchema = new db.Schema({
    client: {type: Number,required:true},
    valor: { type: Number },
    tipo: { type: String },
    descricao: { type: String },
    realizada_em: { type: Date },
   

}
)
const model = db.model('Transaction', transactionSchema)

export default { model, transactionSchema }