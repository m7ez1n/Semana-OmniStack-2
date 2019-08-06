const express = require("express");
const DevController = require("./app/controllers/DevController");
const LikeController = require("./app/controllers/LikeController");
const DislikeController = require("./app/controllers/DislikeController");

const routes = express.Router();

routes.get("/devs", DevController.index);
routes.post("/devs", DevController.store);

routes.post("/devs/:devId/likes", LikeController.store);
routes.post("/devs/:devId/dislikes", DislikeController.store);

module.exports = routes;
