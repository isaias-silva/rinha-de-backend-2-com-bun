import db from "src/db";

const transactionSchema = new db.Schema({
    valor: { type: Number },
    tipo: { type: String },
    descricao: { type: String },

    client: {
        type: Number,
        ref: 'Client',
    }

}
)
const model = db.model('Transaction', transactionSchema)

export default model