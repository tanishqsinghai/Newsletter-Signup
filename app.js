const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});
app.use(express.static("public"));
app.post("/", function(req, res) {
    var fName = req.body.fName;
    var lName = req.body.lName;
    var email = req.body.email;
    var data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: fName,
                LNAME: lName
            }
        }]
    };
    var options = {
        url: "https://us19.api.mailchimp.com/3.0/lists/65dc0294b5",
        method: "POST",
        headers: {
            "Authorization": "tanishqsinghai b4d7574a6ada78c1e5d3e3a671efd29f"
        },
        body: JSON.stringify(data)
    };
    request(options, function(error, response, body) {
        if (error) {
            res.sendFile(__dirname + "/failure.html");
        } else if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else res.sendFile(__dirname + "/failure.html");
    });

});

app.post("/failure", function(req, res) {
    res.redirect("/");
});


app.listen(process.env.PORT || 3000, function() {
    console.log("server is running on port 3000");
});


//b4d7574a6ada78c1e5d3e3a671efd29f-us19- API Key
//65dc0294b5-audience id(list id)