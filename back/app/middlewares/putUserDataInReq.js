import { User } from "../models/User.js";

async function putUserDataInReq(req, res, next) {
    if (req.session.userId) {
        const user = await User.findByPk(req.session.userId);
        req.loggedUser = user;
        res.locals.loggedUser = user;
    }
    next();
}

export default putUserDataInReq;