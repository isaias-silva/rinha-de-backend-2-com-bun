import mongoose from "mongoose";
import db from "src/db";

const clientSchema = new db.Schema({
    id: { type: Number,notNull:true},
    limite: { type: String },
    saldo_inicial: { type: String },

   
}
)
const model = db.model('Client', clientSchema)

export default {model,clientSchema}
