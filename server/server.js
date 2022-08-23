const express = require("express");
const cors = require("cors");
const { nanoid } = require("nanoid");
const {
  updateApp,
  getApps,
  getAppById,
  insertApp,
  deleteAppById,
  addDefaultApps,
} = require("./queries");
const { connectClient } = require("./database");
const PORT = 3000;

const exp = express();
exp.use(express.json());

exp.use(cors());

//Endpoints

exp.get("/api/application/:id", async (req, res) => {
  const appId = req.params.id;
  await getAppById(appId).then((requestedApp) => {
    if (requestedApp == []) {
      res.status(404).send(`application ${appId} not found`);
    } else {
      res.send(requestedApp);
    }
  });
});

exp.get("/api/applications", async (req, res) => {
  await getApps().then((apps) => {
    if (apps == []) {
      res.status(404).send(`Applications do not exist`);
    } else {
      res.send(apps);
    }
  });
});

//  Create
exp.post("/api/application", async (req, res) => {
  const date = new Date();
  const newApp = {
    id: nanoid(),
    imageUrl: req.body.imageUrl,
    name: req.body.name,
    price: req.body.price,
    desc: req.body.desc,
    companyName: req.body.companyName,
    createdAt: `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`,
  };

  insertApp(newApp).then((result) => {
    res.send(result);
  });
});

//  Set Default Apps
exp.put("/api/applications", async (req, res) => {
  addDefaultApps().then((result) => {
    res.send(result);
  });
});

exp.put("/api/application/:id", async (req, res) => {
  const appId = req.params.id;
  updateApp(appId, req.body).then((result) => {
    res.send(result);
  });
});

//Delete
exp.delete("/api/application/:id", async (req, res) => {
  const appId = req.params.id;
  deleteAppById(appId).then((result) => {
    res.send(result); 
  });
});

exp.listen(PORT, function (err) {
  if (err) {
    console.log("Error in server setup");
  }
  console.log("Server listening on Port", PORT);
  connectClient();
});
