import * as express from "express"

const app = express();
app.get("/",(req : express.Request , res : express.Response) =>{
  res.send("start");
})
app.listen(4000,()=>console.log("start"));