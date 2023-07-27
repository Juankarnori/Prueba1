import mongoose, { Schema, model, Model } from 'mongoose';
import { IPerfil } from '@/interface';

const perfilSchema = new Schema({

    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    ciudad: { type: String, required: true },
    celular: { type: String, required: true },

}, {
    timestamps: true,
})

const Perfil:Model<IPerfil> = mongoose.models.Perfil || model('Perfil',perfilSchema);

export default Perfil;