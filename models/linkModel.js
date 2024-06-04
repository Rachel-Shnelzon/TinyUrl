import mongoose from 'mongoose';

const linkSchema = new mongoose.Schema({
    originalUrl: { 
      type: String, 
      required: true 
    },
})

const LinkModel = mongoose.model("links", linkSchema);
export default LinkModel;
