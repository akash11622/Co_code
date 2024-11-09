const express = require("express");
const mongoose = require("mongoose");
const auth = require("./middleware/authMiddleware");
const errHandler = require("./middleware/errorHandler");
const roomRouter = require("./routers/room-router");
const userRouter = require("./routers/user-router");
const webSocketRouter = require("./routers/webSocketRouter");
const cors = require("cors");
require("dotenv").config();
const app = express();

const PORT = process.env.PORT;

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.get("/api",(req,res)=>{
  res.send('backend server is up and running');
})
// route for signup user and login user
app.use("/api/user", userRouter);
app.use("/api/Flushroom", webSocketRouter);
app.use("/api/room", auth);
app.use("/api/room", roomRouter);
app.use(errHandler);

const connect = async () => {
   console.log(process.env.MONGO)
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
};
app.listen(PORT, () => {
  connect();
  console.log(`Server is running on port ${PORT}`);
});
