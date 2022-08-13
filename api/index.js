const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const articleRoute = require("./routes/articles");
const groupRoute = require("./routes/groups");
const tagRoute = require("./routes/tags");
const cors = require("cors");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DB Connection Successfull"))
  .catch((err) => {
    console.error(err);
  });

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/articles", articleRoute);
app.use("/api/groups", groupRoute);
app.use("/api/tags", tagRoute);

app.listen(8800, () => {
  console.log("Backend server is running!");
});
