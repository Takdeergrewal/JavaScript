const express = require("express");
const hbs = require("hbs"); //templating engine
const app = express(); //use express

app.set("port", process.env.PORT || 3000);
app.set("view engine", "hbs");

app.use(
  express.urlencoded({
    extended: false,
  })
);

const session = require("express-session");

const tenMinutes = 1000 * 60 * 10; //in milliseconds

//session configuration
app.use(
  session({
    secret: "your-username-and-secret-key",
    saveUninitialized: false,
    cookie: { maxAge: tenMinutes },
    resave: true,
  })
);

app.get("/personal", (req, res) => {
  res.render("form.hbs");
});

app.post("/payment", (req, res) => {
  //load session variables
    req.session.firstName = req.body.firstName;
    req.session.lastName = req.body.lastName;
    req.session.email = req.body.email;
  res.render("payment-form.hbs", { session: req.session});
});

app.post("/shipping", (req, res) => {
  //retrieve the session variables on any route
    req.session.creditCard = req.body.creditCard;
    req.session.expiryMonth = req.body.expiryMonth;
    req.session.expiryYear = req.body.expiryYear;
  res.render("shipping-form.hbs", { session: req.session });
});

app.post("/confirmation", (req, res) => {
  //retrieve the session variables on any route
    req.session.streetAddress = req.body.streetAddress;
    req.session.city = req.body.city;
    req.session.postalCode = req.body.postalCode;
  res.render("confirmation-form.hbs", { session: req.session});
});

app.get('/payment', (req, res) => {
    res.render('payment-form.hbs', { session: req.session });
  });


app.get('/shipping', (req, res) => {
    res.render('shipping-form.hbs', { session: req.session });
  });
  
 
app.get('/confirmation', (req, res) => {
    res.render('confirmation-form.hbs', {session: req.session });
  });


app.listen(app.get("port"), () => {
  console.log(`Server running on http://localhost:${app.get("port")}`);
});
S