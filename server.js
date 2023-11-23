const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const init = process.argv.includes('--init=true');

const app = express();

require('dotenv').config();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
    cookieSession({
      name: "virtualyou-session",
      keys: ["COOKIE_SECRET"], // should use as secret environment variable
      httpOnly: true,
      sameSite: 'strict'
    })
);

// database
const db = require("./app/models");
const Peep = db.peep;

if (init) {
  db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and Resync Db');
    initial();
  });
} else {
  db.sequelize.sync();
}

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the VirtualYou Personal API." });
});

// routes
require("./app/routes/peep.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


function initial() {
  Peep.create({
    name: "David Knoxville",
    userKey: 10,
    phone1: "919-888-3000",
    phone2: "",
    email: "me@dlwhitehurst.com",
    address: "123 Anywhere Ln, Sampleville, ND, 23045",
    note: "Insurance Agent"
  });

  Peep.create({
    name: "Patty Brown",
    userKey: 10,
    phone1: "722-310-1288",
    phone2: "",
    email: "pbrown@schwartz.com",
    address: "4922 Clamstrip St, Middlebury, CT, 29300",
    note: "Good friend"
  });

  Peep.create({
    name: "Nancy Reynolds",
    userKey: 13,
    phone1: "800-825-9274",
    phone2: "",
    email: "nrey@acme.com",
    address: "",
    note: "Nurse"
  });

  Peep.create({
    name: "Peggy Smith",
    userKey: 13,
    phone1: "892-123-7702",
    phone2: "",
    email: "psmith@yahoo.com",
    address: "3456 Jaybird Ct, Gloucester Pt. VA, 23062",
    note: "Mother in Law"
  });

  Peep.create({
    name: "Robert Sandberg",
    userKey: 13,
    phone1: "877-655-2309",
    phone2: "",
    email: "rsandberg@gmail.com",
    address: "",
    note: "Jeweler"
  });
}
