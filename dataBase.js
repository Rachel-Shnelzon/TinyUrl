import mongoose from "mongoose";

const uri = "mongodb+srv://racheli:Rs1226@!@racheli.qmeescn.mongodb.net/?retryWrites=true&w=majority&appName=racheli";
const uril="mongodb://localhost:27017/TinyUrlDB"

const connectDB = async () => {
  await mongoose.connect(uril);
};
const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error);
})

database.once('connected', () => {
  console.log('Database Connected');
})

export default connectDB;

