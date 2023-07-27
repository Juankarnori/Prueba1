import mongoose, { Schema, model, Model } from 'mongoose';
import { IPill } from '@/interface';

const pillSchema = new Schema({

    nombre: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },

}, {
    timestamps: true,
})

const Pill: Model<IPill> = mongoose.models.Pill || model('Pill',pillSchema);

export default Pill;