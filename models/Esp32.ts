import { IEsp32 } from "@/interface";
import mongoose, { Schema, model, Model } from "mongoose";

const esp32Schema = new Schema({
    user: { type: String, required: true },
    led: { type: Number, required: true, default: 0 },
    status: { 
        type: String,
        enum: {
            values: ['ON','OFF'],
            message: '{VALUE} no es un estado valido'
        }
    }
},{
    timestamps: true
});

const Esp32: Model<IEsp32> = mongoose.models.Esp32 || model('Esp32', esp32Schema);

export default Esp32;