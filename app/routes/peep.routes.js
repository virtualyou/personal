// ****************************************************************************
// Copyright 2023 David L. Whitehurst
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
//
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
//    Unless required by applicable law or agreed to in writing, software
//    distributed under the License is distributed on an "AS IS" BASIS,
//    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//    See the License for the specific language governing permissions and
//    limitations under the License.
//
// ****************************************************************************

module.exports = app => {
    const { authJwt } = require("../utility");
    const peeps = require("../controllers/peep.controller.js");

    // Create a new Peep
    app.post("/api/v1/peeps", peeps.create);

    // Retrieve all Peeps
    app.get(
        "/api/v1/peeps",
        [authJwt.verifyToken, authJwt.isOwner],
        peeps.findAll
    );

    //app.get("/api/v1/peeps", peeps.findAll);

    // Retrieve a single Peep with peepId
    app.get("/api/v1/peeps/:peepId", peeps.findOne);

    // Update a Peep with peepId
    app.put("/api/v1/peeps/:peepId", peeps.update);

    // Delete a Peep with peepId
    app.delete("/api/v1/peeps/:peepId", peeps.delete);

    // Delete all peeps
    app.delete("/api/v1/peeps", peeps.deleteAll);
};
