module.exports = app => {
    const request = require("../controllers/user.controller")
    const router = require('express').Router();

    router.post("/", request.create);

    // id for request
    router.post("/approve", request.approve);

    // id for request
    router.post("/decline", request.decline);

    router.delete("/", request.delete);

    router.put("/", request.update);

    // add parameter, that if ID is provided, send back only those requests
    // associated with such ID (authors ID).
    router.get("/", request.findAll);

    // filter out Requests that are pending, send their IDs
    router.get("/pending", request.getPending);

    router.get("/pending/count", request.getPendingCount);

    app.use("/api/v1/request", router);
}
