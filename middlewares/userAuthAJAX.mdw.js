export const userAuthAJAX = async (req,res,next) => {
    if (!req.session.user) {
        return res.status(200).send({result: 'redirect', url:'/login'});
    } else {
        next();
    }
}