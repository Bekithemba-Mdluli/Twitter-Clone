const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const path = require('path')
const middleware = require('./middleware')
const bodyParser = require("body-parser")

dotenv.config({ path: 'config/config.env'})
const app = express();

const PORT = process.env.PORT

const server = app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`.yellow)
})

// Tell express which template to use
app.set("view engine", "pug")
app.set("views", "views")

app.use(express.urlencoded({ extended: false }));
//Serves static folder
app.use(express.static(path.join(__dirname, "public")))

//Routes
const loginRoute = require('./routes/loginRoutes')
const registerRoute = require('./routes/registerRoutes')

app.use('/login', loginRoute);
app.use('/register', registerRoute);

/* Calls middleware which executes first */
app.get("/", middleware.requireLogin, (req, res, next) => {
    const payload = {
        pageTitle: "Home"
    }

    res.status(200).render("home", payload)
})