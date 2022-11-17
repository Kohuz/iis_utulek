module.exports = app => {
    const events = require("../controllers/user.controller")
    const router = require('express').Router();

    router.post("/", events.create);

    router.delete("/", events.delete);

    router.put("/", events.update);

    // Add parameter for user ID and animal ID, it should work the same as
    // for request (althrough there is animal).
    // For user filter out only walks.
    router.get("/", events.findAll);

    // Return this structure for animal, it should be for 2 weeks ahead.
        /* {
            "day": "Pondělí",
            "hours": [
                {
                    "time": 8,
                    "walk": true,
                    "event": false,
                },
                {
                    "time": 9,
                    "walk": true,
                    "event": false,
                },
                {
                    "time": 10,
                    "walk": true,
                    "event": false,
                },
                {
                    "time": 11,
                    "walk": false,
                    "event": false,
                }
            ]
        }, */
    router.get("/schedule", events.getSchedule);

    app.use("/api/v1/event", router);
}
