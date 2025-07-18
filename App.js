require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./db/connect");

const port = process.env.PORT || 3000;
const products_routes = require("./routes/route");
app.use(cors({
  origin: "*",  
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hii I am Rohit!");
});
app.use("/api/products", products_routes);

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(port, () => {
      console.log(`✅ Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("❌ Error starting the server:", error);
  }
};

start();
