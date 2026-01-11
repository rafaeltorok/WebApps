const testingRouter = require("express").Router();
const Gpu = require("../models/gpu.js");

testingRouter.post("/reset", async (request, response) => {
  await Gpu.deleteMany({});

  response.status(204).end();
});

module.exports = testingRouter;
