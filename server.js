const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const middleware = require('./middleware')

dotenv.config({ path: 'config/config.env'})
const app = express();

const PORT = process.env.PORT

const server = app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`.yellow)
})

// Tell express which template to use
app.set("view engine", "pug")
app.set("views", "static")

/* Calls middleware which executes first */
app.get("/", middleware.requireLogin, (req, res, next) => {
    const payload = {
        pageTitle: "Home"
    }

    res.status(200).render("home", payload)
})