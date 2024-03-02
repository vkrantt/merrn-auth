import mongoose from "mongoose";

const mongodbConnection = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Mongodb connected on port --- ${connection.connection.host}`);
  } catch (error) {
    console.log(`Mongodb connection error --- ${error}`);
    process.exit(1);
  }
};

export default mongodbConnection;
