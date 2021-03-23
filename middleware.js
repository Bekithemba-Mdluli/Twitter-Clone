exports.requireLogin = (req, res, next) => {
    //Check if the session and user are set means logged in
    if(req.session && req.session.user) {
        return next(); 
    } else {
        return res.redirect("/login")
    }
}