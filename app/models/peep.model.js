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

const sql = require("./db.js");

// constructor
const Peep = function(peep) {

    this.name = peep.name;
    this.email = peep.email;
    this.phone1 = peep.phone1;
    this.phone2 = peep.phone2;
    this.address = peep.address;
    this.note = peep.note;
};

Peep.create = (newPeep, result) => {
    sql.query("INSERT INTO peeps SET ?", newPeep, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created peep: ", { id: res.insertId, ...newPeep });
        result(null, { id: res.insertId, ...newPeep });
    });
};

Peep.findById = (peepId, result) => {
    sql.query(`SELECT * FROM peeps WHERE id = ${peepId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found peep: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Peep with the id
        result({ kind: "not_found" }, null);
    });
};

Peep.getAll = result => {
    sql.query("SELECT * FROM peeps", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("peeps: ", res);
        result(null, res);
    });
};

Peep.updateById = (id, peep, result) => {
    sql.query(
        "UPDATE peeps SET name = ?,email = ?,phone1 = ?,phone2 = ?,address = ?,note = ? WHERE id = ?",
        [peep.name,peep.email,peep.phone1,peep.phone2,peep.address,peep.note, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Peep with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated peep: ", { id: id, ...peep });
            result(null, { id: id, ...peep });
        }
    );
};

Peep.remove = (id, result) => {
    sql.query("DELETE FROM peeps WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Peep with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted peep with id: ", id);
        result(null, res);
    });
};

Peep.removeAll = result => {
    sql.query("DELETE FROM peeps", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} peeps`);
        result(null, res);
    });
};

module.exports = Peep;
