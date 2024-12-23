import mongoose, {model,Schema} from 'mongoose';

const urlShortnerSchema = new Schema({
    URL: {type: String, required: true},
    shortURL: {type: String, required: true}
});

export default mongoose.models.Shortner || model("Shortner",urlShortnerSchema)