const express = require("express")
const mongoose = require("mongoose")
const app = express()
const router = require("./routes/auth")
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.json())
app.get("/", (req,res)=>{
    res.send("HELLO WORLDS")
})

app.use("/api", router)

mongoose.connect('mongodb+srv://sherifemad08:HZHhhxy1e5HmDER3@moviegeek.kfwgpjv.mongodb.net/?retryWrites=true&w=majority&appName=MovieGeek',{
  dbName: `MovieGeek`,
})
  .then(() => {
      console.log("Connected to DB")
      const port = process.env.PORT || 8000; 
      app.listen(port, ()=>{
      console.log(`Listening on port ${port}...`)
    })
  })
  .catch(()=>{
      console.log("Error connecting")

  })

   