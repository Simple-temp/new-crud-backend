import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import mongoose from "mongoose";
import UpdateRoute from "./Routes/UpdateRoute.js";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()
app.use(cors())
app.use(express.json()) 
app.use(express.urlencoded({ extended: false })); 
app.use('/uploads', express.static(join(__dirname, 'uploads')));


mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
  console.log("Succesfully connected to MongoDB")
}).catch((err) => {
  console.log(err)
})


app.use("/todo",UpdateRoute)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const port =  process.env.PORT || 4000

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})