import mongoose from 'mongoose';

const clickSchema = new mongoose.Schema({
  insertedAt: {
    type: Date, 
    required: true 
  },
  ipAddress: {
    type: String, 
    required: true 
  },
  targetParamValue:{
    type: String, 
    required: true 
  }
})

const targetSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true 
  },
  value:{
    type: Number, 
    required: true 
  }
})

const linkSchema = new mongoose.Schema({
    originalUrl: { 
      type: String, 
      required: true 
    },
    clicks:[clickSchema],
    targetParamName: {
      type: String, 
      required: true 
    },
    targetValues:[targetSchema]
})

const LinkModel = mongoose.model("links", linkSchema);
export default LinkModel;
