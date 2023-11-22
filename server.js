const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const app = express();

require('dotenv').config();
const USERAUTH_SERVER_PORT_URL = process.env.USERAUTH_SERVER_PORT_URL;

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

const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
      '/userauth',
      createProxyMiddleware({
        target: USERAUTH_SERVER_PORT_URL,
        changeOrigin: true,
      })
  );
};

// database
const db = require("./app/models");
const Peep = db.peep;
/*
db.sequelize.sync({force: true}).then(() => {
        console.log('Drop and Recreate Db');
        initial();
    });
*/
db.sequelize.sync();

// swagger api documentation
const swaggerUi = require("swagger-ui-express"),
    swaggerDocument = require("./swagger.json");

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the VirtualYou Personal Secure API Express application." });
});

// routes
require("./app/routes/peep.routes")(app);

// swagger path to api documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// set port, listen for requests
const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

/*
{
  "name": "Wendy Smith",
    "email": "sissylou@yahoo.com",
    "phone1": "919-354-6938",
    "phone2": "",
    "address": "123 Dreamy Blvd, Los Angeles, CA, 90210",
    "note": "Sister",
    "userKey": 10
}
*/

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
