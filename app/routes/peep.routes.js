/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */

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

/*
 * ************************************************************************
 * ADMIN ONLY
 * ************************************************************************
 */
    // GET - all peeps
    app.get(
        "/personal/v1/peeps",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.getAllPeeps
    );

    // GET - a peep by id
    app.get(
        "/personal/v1/peeps/:id",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.getPeep
    );

    // PUT - update a peep by id
    app.put(
        "/personal/v1/peeps/:id",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.updatePeep
    );

    // DELETE - a peep by id
    app.delete(
        "/personal/v1/peeps/:id",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.deletePeep
    );

    // DELETE - all peeps
    app.delete(
        "/personal/v1/peeps",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.deleteAllPeeps
    );

    /*
     * ************************************************************************
     * OWNER, AGENT, (MONITOR?) USER
     * ************************************************************************
     */

    // GET - all peeps for owner
    app.get(
        "/personal/v1/owner/peeps",
        [authJwt.verifyToken, authJwt.isOwnerOrAgentOrMonitor],
        controller.getAllPeepsForOwner
    );

    // GET - peep by id for owner only
    app.get(
        "/personal/v1/owner/peeps/:id",
        [authJwt.verifyToken, authJwt.isOwnerOrAgentOrMonitor],
        controller.getPeepForOwner
    );

    // POST - create a new Peep for owner (owner or agent cognizant of userKey)
    app.post(
        "/personal/v1/owner/peeps",
        [authJwt.verifyToken, authJwt.isOwnerOrAgent],
        controller.createPeepForOwner
    );

    // PUT - update a peep for owner only
    app.put(
        "/personal/v1/owner/peeps/:id",
        [authJwt.verifyToken, authJwt.isOwnerOrAgent],
        controller.updatePeepForOwner
    );

    // DELETE - delete a peep by id for owner only
    app.delete(
        "/personal/v1/owner/peeps/:id",
        [authJwt.verifyToken, authJwt.isOwnerOrAgent],
        controller.deletePeepForOwner
    );

    // DELETE - all peeps for owner only
    app.delete(
        "/personal/v1/owner/peeps",
        [authJwt.verifyToken, authJwt.isOwnerOrAgent],
        controller.deleteAllPeepsForOwner
    );

};

