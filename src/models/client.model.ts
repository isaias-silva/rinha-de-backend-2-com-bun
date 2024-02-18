import mongoose from "mongoose";
import db from "src/db";

const clientSchema = new db.Schema({
    id: { type: Number, notNull: true },
    limite: { type: Number },
    saldo: { type: Number },


}
)
const model = db.model('Client', clientSchema)

export default { model, clientSchema }
