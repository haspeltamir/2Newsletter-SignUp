const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const port1 = 3000;
const port2 = process.env.PORT;

app.use(express.static("public"));

app.listen(port1 || port2, function () {
  if (port1) {
    console.log(`Example app listening on port ${port1}`);
  } else {
    console.log(`Example app listening on port ${port2}`);
  }
});

app.get("/signup", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/signup", function (req, res) {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const Email = req.body.Email;
  // console.log(Email);
  const listid = "9a7ae3869a";
  const apikey = "53af665483fbc6f51830251ed927bef2-us14";

  var data = {
    members: [
      {
        email_address: Email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };
  var jsonData = JSON.stringify(data);
  var url = "https://us14.api.mailchimp.com/3.0/lists/9a7ae3869a";
  var options = {
    method: "POST",
    auth: "tamirr:53af665483fbc6f51830251ed927bef2-us14",
  };

  const request = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
});
app.post("/failure", function (req, res) {
  res.redirect("/signup");
});
// const apikey = "53af665483fbc6f51830251ed927bef2-us14";
// const listid = "9a7ae3869a";
