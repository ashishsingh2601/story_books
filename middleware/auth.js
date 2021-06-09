//for securing routes
//middleware is a function that has access to the request and response object

module.exports = {
    ensureAuth: (req, res, next)=>{
        if(req.isAuthenticated()){
            return next();
        }else{
            res.redirect('/');
        }
    },
    ensureGuest: (req, res, next)=>{
        if(req.isAuthenticated()){
            res.redirect('/dashboard');
        }else{
            return next();
        }
    }
};