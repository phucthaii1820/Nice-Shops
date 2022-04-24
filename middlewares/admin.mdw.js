export const adminAuth = async (req,res,next) => {
    if (!req.session.user) {
        return res.redirect('/login');
    } else if (req.session.user.role != 100) {
        return res.redirect('/');
    }
    else {
        next();
    }
}