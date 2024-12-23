import type {NextFunction, Request, Response} from 'express';
import UserCollection from "./collection";

const doesCurrentSessionUserExists = async (req: Request, res: Response, next: NextFunction) => {
    if (req.session.username) {
        const user = await UserCollection.findOneByUsername(req.session.username);

        if (!user) {
            req.session.username = undefined;
            res.status(500).json({
                error: {
                    userNotFound: 'User session was not recognized.'
                }
            });
            return;
        }
    }

    next();
};

export {
    doesCurrentSessionUserExists,
}
