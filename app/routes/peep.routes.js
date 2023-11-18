const { authJwt } = require("../utility");
const controller = require("../controllers/peep.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.get(
        "/personal/v1/peeps",
//        [authJwt.verifyToken],
        controller.getAllPeeps //getAllPeeps
    );

    app.get(
        "/personal/v1/peeps/:id",
//        [authJwt.verifyToken, authJwt.isOwner],
        controller.getPeep
    );

    // Create a new Peep
    app.post(
        "/personal/v1/peeps",
//        [authJwt.verifyToken, authJwt.isOwner],
        controller.createPeep
    );

    // Update a Peep with PeepId
    app.put(
        "/personal/v1/peeps/:id",
//        [authJwt.verifyToken, authJwt.isOwner],
        controller.updatePeep
    );

    // Delete a Peep with PeepId
    app.delete(
        "/personal/v1/peeps/:id",
//        [authJwt.verifyToken, authJwt.isOwner],
        controller.deletePeep
    );

    // Delete all Peeps
    app.delete(
        "/personal/v1/peeps",
//        [authJwt.verifyToken, authJwt.isOwner],
        controller.deleteAllPeeps
    );
};

