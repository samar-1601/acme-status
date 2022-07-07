import mongoose from "mongoose";

const connectMongo = async () => mongoose.connect(process.env.MONGODB_URL ?? "", {}, () =>
  console.log("Connected to MongoDB")
);

export default connectMongo;