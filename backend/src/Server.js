import express from "express";
import cors from "cors"
import dotenv from "dotenv";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

//Middlewares
app.use(
    cors({
    origin: "http://localhost:5173",
    credentials: true
})
);
app.use(express.json()); //This middleware parse JSON bodies : req.body = { ... }
app.use(rateLimiter);


// app.use((req,res,next) => {
//     console.log(`Req method is ${req.method} and url is ${req.url}`);
//     next();
// }) 

app.use("/api/notes", notesRoutes);


//Here we using Endpoint
//An endpoint is an combination of URL and HTTP method
//that lets the client interact with the specific resource



//http://localhost:5001/api/notes/1
connectDB().then(() =>{
app.listen(PORT, () => {
    console.log("Server is running on PORT:", PORT);
});
});


