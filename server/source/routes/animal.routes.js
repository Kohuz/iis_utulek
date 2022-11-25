module.exports = (app) => {
  const animals = require("../controllers/animal.controller");
  const router = require("express").Router();

  router.post("/", animals.create);

  // takes boolean
  // router.post('/borrowed', animals.borrowed);

  router.delete("/:id(\\d+)", animals.deleteById);

  // router.put('/', animals.update);

  router.get("/", animals.findAll);

  router.get("/:id(\\d+)", animals.findById);

  app.use("/api/v1/animal", router);
};
