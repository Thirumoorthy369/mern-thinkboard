import express from "express";
import cors from "cors"
import dotenv from "dotenv";
import path from "path";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();
//Middlewares
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}
app.use(express.json()); //This middleware parse JSON bodies : req.body = { ... }
app.use(rateLimiter);


// app.use((req,res,next) => {
//     console.log(`Req method is ${req.method} and url is ${req.url}`);
//     next();
// }) 

app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}
//it was only done if app is on render.com


//Here we using Endpoint
//An endpoint is an combination of URL and HTTP method
//that lets the client interact with the specific resource



//http://localhost:5001/api/notes/1
connectDB().then(() =>{
app.listen(PORT, () => {
    console.log("Server is running on PORT:", PORT);
});
});


