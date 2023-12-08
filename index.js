const express = require("express");
const app = express();
const uuid = require("uuid");
const path = require("path");

app.get("/", (req, res) => {
  try {
    res.send("Home Page");
  } catch (error) {
    throw new Error(`Error in Home api`)
  }
});

app.get("/GET/html", (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  } catch (error) {
    throw new Error(`Error in html api`);
  }
});

app.get("/GET/json", (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "public", "jsonFile.json"));
  } catch (error) {
    throw new Error(`Error in json api`);
  }
});

app.get("/GET/uuid", (req, res) => {
  try {
    res.json({
      uuid: uuid.v4(),
    });
  } catch (error) {
    throw new Error(`Error in uuid api`);
  }
});

app.get("/GET/status/:id", (req, res) => {
  try {
    const id = req.params.id;
    if (id >= 100 && id < 599) {
      res.status(200).send(`status code is ${id}`);
    } else {
      res.status(404).send(`${id} Not a Valid status code`);
    }
  } catch (error) {
    throw new Error(`Error in status api`);
  }
});

app.get("/GET/delay/:t", (req, res) => {
  try {
    const time = req.params.t;
    setTimeout(() => {
      res.send(`Successfully excuted after ${time} second`);
    }, time * 1000);
  } catch (error) {
    throw new Error(`Error in delay api`);
  }
});

//if page not found 
app.all("*", (req, res, next) => {
  res.status(404).json({ err: "Page Not found" });
});

// if some thing went wrong 
app.use((err, req, res, next) => {
  res.status(500).json({ err: err.message});
});

const Port = 8000;
app.listen(Port, () => {
  console.log(`Server is on ${Port}...`);
});
