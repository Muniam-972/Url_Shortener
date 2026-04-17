const express = require("express")
const cors = require("cors")
const urlRoutes = require("./routes/urlRoutes")
const mongoose = require("mongoose")
const app = express()

// CORS configuration
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:3000'],
  credentials: true
}))

app.use(express.json())
app.use("/url",urlRoutes)
// Handle GET requests for redirects at root level
app.get("/:shortId", require("./controllers/urlController").redirectUrl)
require("dotenv").config()
const PORT = process.env.PORT || 3000

 app.listen(PORT,()=>{
    console.log("Server is listening on the "+PORT)
 })

 mongoose.connect(process.env.MONGODB_URI)
 .then(()=>{
    console.log("Connected to database")
 })
 .catch((err)=>{
    console.log("Error connecting to database",err)
 })