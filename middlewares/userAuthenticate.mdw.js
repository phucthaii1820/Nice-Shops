export const userAuth = async (req,res,next) => {
    if (!req.session.user) {
        return res.redirect('/login');
    } else {
        next();
    }
}