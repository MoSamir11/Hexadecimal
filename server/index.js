import express from "express";
const app = express();
import axios from "axios";
const PORT = 3002;

app.listen(PORT,()=>{
    console.log(`Server is running on localhost: ${PORT}`);
})

app.get("/",async(req,response)=>{
   await axios.get("https://jsonplaceholder.typicode.com/users")
   .then(res=>{
    response.send({isSuccess:true,total:res.data.length,data:res.data})
   }).catch(err=>{
       response.json(err)
   })
})