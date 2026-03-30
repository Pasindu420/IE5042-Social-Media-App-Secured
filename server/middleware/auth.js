
const auth = (req, res, next) => {
    // console.log(req.headers.data);
    try {
        req.userId = req.headers._id ? req.headers._id : req.headers.sub;
        console.log(req.userId);
        next();
    } catch (error) {
        console.log(error);
    }
}

export default auth;