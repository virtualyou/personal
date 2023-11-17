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

// FIXME review controller

const Peep = require("../models/peep.model.js");

// Create and Save a new Peep
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    //console.log(req.body);

    // Create a Peep
    const peep = new Peep({
        name: req.body.name,
        email: req.body.email,
        phone1: req.body.phone1,
        phone2: req.body.phone2,
        address: req.body.address,
        note: req.body.note
    });

    // Save Peep in the database
    Peep.create(peep, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Peep."
            });
        else {
            res.status(201); // created (success)
            res.send(''); // empty body
        }
    });
};

// Retrieve all Peeps from the database.
exports.findAll = (req, res) => {
    Peep.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving peeps."
            });
        else {
		res.header("Access-Control-Allow-Origin", "*");
		res.send(data);
	}
		
    });
};

// Find a single Peep with a peepId
exports.findOne = (req, res) => {
    Peep.findById(req.params.peepId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Peep with id ${req.params.peepId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Peep with id " + req.params.peepId
                });
            }
        } else res.send(data);
    });
};

// Update a Peep identified by the peepId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    console.log(req.body);

    Peep.updateById(
        req.params.peepId,
        new Peep(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Peep with id ${req.params.peepId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Peep with id " + req.params.peepId
                    });
                }
            } else {
                res.status(204); // no content (success)
                res.send(''); // empty body
            }
        }
    );
};

// Delete a Peep with the specified peepId in the request
exports.delete = (req, res) => {
    Peep.remove(req.params.peepId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Peep with id ${req.params.peepId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Peep with id " + req.params.peepId
                });
            }
        } else {
            res.status(204); // no content (success)
            res.send(''); // empty body
        }
    });
};

// Delete all Peeps from the database.
exports.deleteAll = (req, res) => {
    Peep.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all peeps."
            });
        else {
            res.status(204); // no content (success)
            res.send(''); // empty body
        }
    });
};
