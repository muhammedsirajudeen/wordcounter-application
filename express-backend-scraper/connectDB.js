const mongoose=require("mongoose") 
require('dotenv').config();

const dbURI=process.env.MONGODB_URI

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,

    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

module.exports=connectDB