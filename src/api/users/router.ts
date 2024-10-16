import express, {Request, Response} from "express";
import UserCollection from "./collection";

const router = express.Router();

router.post(
    '/session',
    [],
    async (req: Request, res: Response) => {
    const {username, password} = req.body;

    // Find user (replace this with database query in real use case)
    const user = await UserCollection.findOneByUsernameAndPassword(username, password);
    if (!user) {
        return res.status(401).send({message: 'Invalid credentials'});
    }

    // Generate JWT
    // const token = jwt.sign({username: user.username}, secret, {expiresIn: '1y'});
    // res.status(200).send({token});
    // TODO init session
});

export { router as usersRouter }
