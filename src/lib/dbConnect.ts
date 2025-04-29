import mongoose from "mongoose";

export async function dbConnect() {
  const mongoosurl = `mongodb+srv://${process.env.MONGODB_USER_NAME}:${process.env.MONGODB_PASSWORD}@cluster0.ed4wmgt.mongodb.net/aiMockinterview?retryWrites=true&w=majority&appName=Cluster0`;
  // const mongoosurl = `mongodb+srv://uks08122002:msEDNg9KGcjnCrmx@cluster0.ed4wmgt.mongodb.net/aiMockinterview?retryWrites=true&w=majority&appName=Cluster0`;
  try {
    await mongoose.connect(mongoosurl);
    console.log("connect");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
