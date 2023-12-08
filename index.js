const express = require("express");
const app = express();
const uuid = require("uuid");
const path = require("path");

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get("/GET/html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/GET/json", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "jsonFile.json"));
});

app.get("/GET/uuid", (req, res) => {
  res.json({
    uuid: uuid.v4(),
  });
});

app.get("/GET/status/:id", (req, res) => {
  const id = req.params.id;
  if(id >= 100 && id < 599){
    res.status(200).send(`status code is ${id}`);
  }
  else{
    res.status(404).send(`${id} Not a Valid status code`);
  }
});

app.get("/GET/delay/:t", (req,res)=>{
  const time = req.params.t;
  setTimeout(()=>{
    res.send(`Successfully excuted after ${time} second`)
  }, time * 1000)
})


const Port = 8000;
app.listen(Port, () => {
  console.log(`Server is on ${Port}...`);
});
